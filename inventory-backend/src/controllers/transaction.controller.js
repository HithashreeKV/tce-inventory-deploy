
import { supabase } from '../config/supabase.js';

export const getAllTransactions = async (req, res) => {
  try {
    const { data: transactions, error } = await supabase
      .from('student_transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(transactions || []);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const body = req.body;

    if (!body.productId || !body.student_name || !body.transaction_type) {
      return res.status(400).json({ error: 'Missing required fields: productId, student_name, transaction_type' });
    }

    const insertData = {
      product_id: body.productId,
      student_name: body.student_name,
      transaction_type: body.transaction_type,
    };

    if (body.usn) insertData.usn = body.usn;
    if (body.section) insertData.section = body.section;
    if (body.issue_date) insertData.issue_date = body.issue_date;
    if (body.phone_number) insertData.phone_number = body.phone_number;
    if (body.quantity) insertData.quantity = body.quantity;
    if (body.return_date) insertData.return_date = body.return_date;

    const { data: tx, error: txError } = await supabase
      .from('student_transactions')
      .insert(insertData)
      .select()
      .single();

    if (txError) {
      return res.status(400).json({ error: txError.message });
    }

    if (!tx) {
      return res.status(400).json({ error: 'Failed to create transaction' });
    }

    const qty = body.quantity || 1;
    
    if (body.transaction_type === 'borrowed') {
      const { data: stock, error: stockFetchError } = await supabase
        .from('product_stock')
        .select('available_count, master_count')
        .eq('product_id', body.productId)
        .single();

      if (!stockFetchError) {
        const newAvailable = Math.max(0, (stock.available_count || 0) - qty);
        await supabase
          .from('product_stock')
          .update({ available_count: newAvailable })
          .eq('product_id', body.productId);
      }
    } else if (body.transaction_type === 'purchased') {
      const { data: stock, error: stockFetchError } = await supabase
        .from('product_stock')
        .select('available_count, master_count')
        .eq('product_id', body.productId)
        .single();

      if (!stockFetchError) {
        const newMaster = Math.max(0, (stock.master_count || 0) - qty);
        const newAvailable = Math.max(0, (stock.available_count || 0) - qty);
        await supabase
          .from('product_stock')
          .update({ master_count: newMaster, available_count: newAvailable })
          .eq('product_id', body.productId);
      }
    }

    await supabase.from('inventory_logs').insert({
      product_id: body.productId,
      action_type:
        body.transaction_type === 'borrowed'
          ? 'student_borrow'
          : 'student_purchase',
      quantity_changed: -(qty),
      reference_id: tx.id
    });

    res.json({ message: 'Transaction saved', transactionId: tx.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const returnProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Transaction ID required' });
    }

    const { data: tx, error: fetchError } = await supabase
      .from('student_transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(400).json({ error: fetchError.message });
    }

    if (!tx) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const { error: updateError } = await supabase
      .from('student_transactions')
      .update({ return_date: new Date().toISOString() })
      .eq('id', id);

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    if (tx.transaction_type === 'borrowed') {
      const qty = tx.quantity || 1;
      
      const { data: stock, error: stockFetchError } = await supabase
        .from('product_stock')
        .select('available_count, master_count')
        .eq('product_id', tx.product_id)
        .single();

      if (!stockFetchError) {
        const newAvailable = (stock.available_count || 0) + qty;
        await supabase
          .from('product_stock')
          .update({ available_count: newAvailable })
          .eq('product_id', tx.product_id);
      }
    }

    const { error: logError } = await supabase.from('inventory_logs').insert({
      product_id: tx.product_id,
      action_type: 'student_return',
      quantity_changed: tx.quantity || 1,
      reference_id: id
    });

    res.json({ message: 'Returned successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Transaction ID required' });
    }

    const { data: tx, error: fetchError } = await supabase
      .from('student_transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      return res.status(400).json({ error: fetchError.message });
    }

    if (!tx) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const qty = tx.quantity || 1;

    if (tx.transaction_type === 'borrowed') {
      if (!tx.return_date) {
        const { data: stock, error: stockFetchError } = await supabase
          .from('product_stock')
          .select('available_count')
          .eq('product_id', tx.product_id)
          .single();

        if (!stockFetchError && stock) {
          const newAvailable = (stock.available_count || 0) + qty;
          await supabase
            .from('product_stock')
            .update({ available_count: newAvailable })
            .eq('product_id', tx.product_id);
        }
      }
    } else if (tx.transaction_type === 'purchased') {
      const { data: stock, error: stockFetchError } = await supabase
        .from('product_stock')
        .select('available_count, master_count')
        .eq('product_id', tx.product_id)
        .single();

      if (!stockFetchError && stock) {
        const newMaster = (stock.master_count || 0) + qty;
        const newAvailable = (stock.available_count || 0) + qty;
        await supabase
          .from('product_stock')
          .update({ master_count: newMaster, available_count: newAvailable })
          .eq('product_id', tx.product_id);
      }
    }

    const { error: deleteError } = await supabase
      .from('student_transactions')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return res.status(400).json({ error: deleteError.message });
    }

    await supabase.from('inventory_logs').insert({
      product_id: tx.product_id,
      action_type: 'transaction_deleted',
      quantity_changed: 0,
      reference_id: id
    });

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
