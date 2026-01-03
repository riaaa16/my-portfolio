// Practice retrieving from DB
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.NOTION_TOKEN;
if (!token) {
    console.error('Missing NOTION_TOKEN in environment variables.');
    process.exit(1);
}

const client = new Client({ auth: token });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;
const DATA_SOURCE_ID = process.env.NOTION_DATASOURCE_ID;

function getTitle(page) {
  const titleProperty = Object.values(page.properties).find(p => p.type === 'title');
  return titleProperty ? titleProperty.title.map(t => t.plain_text).join('') : 'Untitled';
}

function getImageUrl(page) {
  const prop = page.properties.Images;

  if (!prop || prop.type !== 'files' || !Array.isArray(prop.files)) return null;
  const fileEntry = prop.files.find(f => f.type === 'file');
  if (!fileEntry || !fileEntry.file) return null;
  return { url: fileEntry.file.url, expiry_time: fileEntry.file.expiry_time || null };
}

async function listPages(databaseId) {
  const pages = [];

  const res = await client.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      property: 'Publish',
      "checkbox": {
        "equals": true
      }
    }
  });

  pages.push(...res.results);

  return pages;
}

(async () => {
  try {
    const pages = await listPages(DATABASE_ID);
    console.log(`Retrieved ${pages.length} pages:`);
    pages.forEach((page, index) => {
      console.log(`${index + 1}- ${getTitle(page)}`);

      const tags = page.properties.Tags.multi_select;
      console.log(tags.map(tag => tag.name).join(', '));
      console.log(page.properties.Description.rich_text.map(t => t.plain_text).join(''));

      const file = getImageUrl(page);
      if (file) {
        console.log('Image URL:', file.url);
        if (file.expiry_time) console.log('Expires:', file.expiry_time);
      } else {
        console.log('No Image URL found.');
      }
    });
  } catch (err) {
    console.error('Notion error:', err);
    process.exit(1);
  }
})();