
import { supabase } from '../config/supabase.js';

export const addProduct = async (req, res) => {
  try {
    const { name, description, masterCount } = req.body;

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({ name, description })
      .select()
      .single();

    if (productError) {
      return res.status(400).json({ error: productError.message });
    }

    const { error: stockError } = await supabase.from('product_stock').insert({
      product_id: product.id,
      master_count: masterCount || 0,
      available_count: masterCount || 0
    });

    await supabase.from('inventory_logs').insert({
      product_id: product.id,
      action_type: 'company_purchase',
      quantity_changed: masterCount || 0
    });

    const responseData = {
      id: product.id,
      name: product.name,
      description: product.description,
      masterCount: masterCount || 0,
      availability: masterCount || 0,
      createdAt: new Date()
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { data } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        product_stock (master_count, available_count)
      `);

    const mappedProducts = (data || []).map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      masterCount: product.product_stock?.[0]?.master_count || 0,
      availability: product.product_stock?.[0]?.available_count || 0,
      createdAt: new Date()
    }));

    res.json(mappedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const updateMaster = async (req, res) => {
  const { id } = req.params;
  const { masterCount } = req.body;

  await supabase
    .from('product_stock')
    .update({ master_count: masterCount })
    .eq('product_id', id);

  res.json({ message: 'Updated' });
};
