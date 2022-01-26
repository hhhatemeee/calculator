import { app } from '../../gulpfile.js';

const server = () => { // Запуск сервера
    app.plugins.browsersync.init({
        server: { baseDir: `${app.path.build.html}` },
        notify: false,
        online: true,
    });
};

export default server;
