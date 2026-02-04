
import { supabase } from '../config/supabase.js';
import { generatePDF } from '../utils/generatePDF.js';

const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const buildMonthBuckets = (months) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
  const buckets = [];

  for (let i = 0; i < months; i += 1) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const key = getMonthKey(d);
    buckets.push({
      key,
      month: d.toLocaleString('en-US', { month: 'long' }),
      newlyPurchased: 0,
      defectiveRemoved: 0,
      utilizedItems: 0,
      netAvailabilityChange: 0,
      openingStock: 0,
      closingStock: 0,
    });
  }

  return buckets;
};

export const downloadPDF = async (req, res) => {
  const { month } = req.query;

  const { data } = await supabase
    .from('inventory_logs')
    .select('*')
    .gte('created_at', `${month}-01`)
    .lte('created_at', `${month}-31`);

  generatePDF(data, res, month);
};

export const getMonthlySummary = async (req, res) => {
  try {
    const months = Math.min(Math.max(parseInt(req.query.months || '6', 10), 1), 12);
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const { data: logs, error: logsError } = await supabase
      .from('inventory_logs')
      .select('action_type, quantity_changed, created_at')
      .gte('created_at', start.toISOString())
      .lte('created_at', end.toISOString());

    if (logsError) {
      return res.status(400).json({ error: logsError.message });
    }

    const { data: stock, error: stockError } = await supabase
      .from('product_stock')
      .select('available_count');

    if (stockError) {
      return res.status(400).json({ error: stockError.message });
    }

    const totalAvailable = (stock || []).reduce(
      (sum, s) => sum + (s.available_count || 0),
      0,
    );

    const buckets = buildMonthBuckets(months);
    const bucketMap = new Map(buckets.map((b) => [b.key, b]));

    (logs || []).forEach((log) => {
      const createdAt = new Date(log.created_at);
      const key = getMonthKey(createdAt);
      const bucket = bucketMap.get(key);
      if (!bucket) return;

      const qty = Number(log.quantity_changed || 0);

      switch (log.action_type) {
        case 'company_purchase':
          bucket.newlyPurchased += qty;
          bucket.netAvailabilityChange += qty;
          break;
        case 'student_borrow':
          bucket.utilizedItems += Math.abs(qty);
          bucket.netAvailabilityChange += qty;
          break;
        case 'student_return':
          bucket.netAvailabilityChange += qty;
          break;
        case 'student_purchase':
          bucket.netAvailabilityChange += qty;
          break;
        case 'defective_removed':
          bucket.defectiveRemoved += Math.abs(qty);
          bucket.netAvailabilityChange += qty;
          break;
        default:
          break;
      }
    });

    let runningClosing = totalAvailable;
    for (let i = buckets.length - 1; i >= 0; i -= 1) {
      const bucket = buckets[i];
      bucket.closingStock = runningClosing;
      bucket.openingStock = runningClosing - bucket.netAvailabilityChange;
      runningClosing = bucket.openingStock;
    }

    const currentKey = getMonthKey(now);
    const result = buckets.map(({ key, netAvailabilityChange, ...rest }) => {
      if (key !== currentKey) {
        return {
          month: rest.month,
          newlyPurchased: null,
          defectiveRemoved: null,
          utilizedItems: null,
          openingStock: null,
          closingStock: null,
        };
      }

      return rest;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to build monthly summary' });
  }
};
