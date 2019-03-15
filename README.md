# react-todolist
### todoFront

about todoFront is based on react and parcel,it is not created by create-react-app.

if you want to use react in parcel,you should install at least these packages below.

```javascript
npm install --save react
npm install --save react-dom
npm install --save-dev babel-preset-react
npm install --save-dev babel-preset-env
npm install --save-dev parcel-bundler
```

now create a  file named .babelrc  in main dir, the code below tell parcel we use es6 and jsx.

```javascript
{
  "presets": ["env", "react"]
}

```



##### How to use

- download the file
- npm install in main dir
- npm start

you will konw that  **npm start** in fact is equal to parcel index.html by reading package.json scripts order. in scripts: {"start": "parcel index.html"}.



##### Why use parcel

this react-todolist is a simple project, create-react-app and use webapck is unnecessary.



### todoServer

todoServer is based on koa2.database is mysql.todoSerever is aimed at providing api for todoFront.

you can send http request through ajax.

##### how to use

- download in your local
- npm install
- node app.js or click start.cmd.