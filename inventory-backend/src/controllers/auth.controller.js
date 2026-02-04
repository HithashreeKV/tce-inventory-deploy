import { supabase } from '../config/supabase.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      name,
      email
    });

    res.json({ message: 'Signup successful', user: { id: data.user.id, email } });
  } catch (error) {
    console.error('❌ Signup exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
