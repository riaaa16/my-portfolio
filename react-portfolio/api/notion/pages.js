import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATA_SOURCE_ID = process.env.NOTION_DATASOURCE_ID;

export default async function handler(req, res) {
  if (!DATA_SOURCE_ID) return res.status(500).json({ error: 'Missing NOTION_DATASOURCE_ID' });
  try {
    const pages = [];
    let cursor = undefined;
    do {
      const r = await notion.dataSources.query({
        data_source_id: DATA_SOURCE_ID,
        filter: { property: 'Publish', checkbox: { equals: true } },
        page_size: 100,
        start_cursor: cursor
      });
      pages.push(...r.results);
      cursor = r.has_more ? r.next_cursor : undefined;
    } while (cursor);

    const mapped = pages.map(p => {
      const titleProp = Object.values(p.properties || {}).find(x => x.type === 'title');
      const title = titleProp?.title?.[0]?.plain_text ?? '';
      const descProp = p.properties?.Description;
      const description = (descProp?.rich_text || []).map(t => t.plain_text).join('') || '';
      const tags = (p.properties?.Tags?.multi_select || []).map(t => t.name);
      const files = p.properties?.Images?.files || [];
      const fileEntry = files.find(f => f.type === 'file');
      const image = fileEntry ? { url: fileEntry.file.url, expiry_time: fileEntry.file.expiry_time || null } : null;
      const pageUrl = p.properties?.Page?.url ?? null;
      const github = p.properties?.GitHub?.url ?? null;
      return { id: p.id, title, description, tags, image, page: pageUrl, github };
    });

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return res.status(200).json({ pages: mapped });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: String(err) });
  }
}