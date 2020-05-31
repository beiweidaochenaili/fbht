const { override, fixBabelImports, addLessLoader,addBabelPlugins } = require('customize-cra');
module.exports = override(
    // 实现 antd 的按需加载
    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        /**
           style: true 表示 less 样式文件格式
           style: 'css' 表示 css 样式文件格式
        */
        style: true,
        externals:{
            'BMap':'BMap',
        }
    }),
    addLessLoader({
        // true 表示支持 less 样式文件格式
        javascriptEnabled: true, 
    }),
    addBabelPlugins( // ⽀持装饰器 
        [ '@babel/plugin-proposal-decorators', 
        { 
        legacy: true 
        } 
        ] 
        ),
         
);