import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function handler(req, res) {
  const pageId = String((req.query && req.query.pageId) || req.body?.pageId || '');
  if (!pageId) return res.status(400).json({ error: 'Missing pageId' });

  try {
    const p = await notion.pages.retrieve({ page_id: pageId });
    const files = p.properties?.Images?.files || [];
    const fileEntry = files.find(f => f.type === 'file');
    if (!fileEntry) return res.status(200).json({ url: null, message: 'No Notion-hosted file' });

    return res.status(200).json({ url: fileEntry.file.url, expiry_time: fileEntry.file.expiry_time || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
}