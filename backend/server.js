import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Забезпечити папку uploads
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Файл для зберігання даних інвентарю
const DATA_FILE = path.join(__dirname, 'inventory.json');

// Ініціалізація даних, якщо файл відсутній
if (!fs.existsSync(DATA_FILE)) {
  const sampleData = [
    {
      id: '1',
      inventory_name: 'Ноутбук MacBook Pro',
      description: '14-дюймовий, M3 Pro, 16GB RAM',
      photo: '/uploads/sample-mac.jpg'
    },
    {
      id: '2',
      inventory_name: 'Механічна клавіатура',
      description: 'Keychron K2, червоні перемикачі',
      photo: '/uploads/sample-keyboard.jpg'
    }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(sampleData, null, 2));
}

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Налаштування multer для фото
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({ storage });

// ---------- API ENDPOINTS ----------
// GET /inventory
app.get('/inventory', (req, res) => {
  const items = readData();
  res.json(items);
});

// GET /inventory/:id
app.get('/inventory/:id', (req, res) => {
  const items = readData();
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /register (create) - multipart/form-data
app.post('/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  if (!inventory_name) {
    return res.status(400).json({ error: 'inventory_name is required' });
  }
  const newItem = {
    id: uuidv4(),
    inventory_name,
    description: description || '',
    photo: req.file ? `/uploads/${req.file.filename}` : ''
  };
  const items = readData();
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

// PUT /inventory/:id (оновлення текстових полів)
app.put('/inventory/:id', (req, res) => {
  const { inventory_name, description } = req.body;
  const items = readData();
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  if (inventory_name) items[index].inventory_name = inventory_name;
  if (description !== undefined) items[index].description = description;
  writeData(items);
  res.json(items[index]);
});

// PUT /inventory/:id/photo (оновлення фото)
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const items = readData();
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  if (!req.file) return res.status(400).json({ error: 'No photo uploaded' });
  // Видали старе фото, якщо потрібно (опціонально)
  if (items[index].photo) {
    const oldPath = path.join(__dirname, items[index].photo);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }
  items[index].photo = `/uploads/${req.file.filename}`;
  writeData(items);
  res.json(items[index]);
});

// DELETE /inventory/:id
app.delete('/inventory/:id', (req, res) => {
  let items = readData();
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  // Видалити файл фото, якщо існує
  if (item.photo) {
    const filePath = path.join(__dirname, item.photo);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  items = items.filter(i => i.id !== req.params.id);
  writeData(items);
  res.status(204).send();
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));