const http = require('http');
const url = require('url');
const { addTask, deleteTask, completeTask, getTasks } = require('./functions');

const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);
const path = parsedUrl.pathname;

if (path === '/tasks' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
    body += chunk;
    });
    req.on('end', () => {
    const task = JSON.parse(body);
    addTask(task);
    res.statusCode = 201;
    res.end('Task added successfully');
    });
} else if (path === '/tasks' && req.method === 'GET') {
    const tasks = getTasks();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tasks));
} else if (path.startsWith('/tasks/') && req.method === 'DELETE') {
    const taskId = path.split('/')[2];
    deleteTask(taskId);
    res.statusCode = 200;
    res.end('Task deleted successfully');
} else if (path.startsWith('/tasks/') && req.method === 'PUT') {
    const taskId = path.split('/')[2];
    completeTask(taskId);
    res.statusCode = 200;
    res.end('Task marked as completed');
} else {
    res.statusCode = 404;
    res.end('Endpoint not found');
}
});

server.listen(3000, () => {
console.log('Server running on port 3000');
});