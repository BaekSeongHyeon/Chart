const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', //proxy가 필요한 path parameter
        createProxyMiddleware({
            target: 'http://10.10.211.209:3000', //타겟이 되는 api url
            changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
        })
    );
};