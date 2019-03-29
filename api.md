目录

### 1.获取用户待办事项

### 2.新增待办事项

### 3.删除待办事项

### 4.修改待办事项

### 5.获取不同状态的待办事项

### 6.注册

### 7.登录

------

### 修改记录

| date      | description                | type   |
| --------- | -------------------------- | ------ |
| 2019/3/28 | 新增注册接口 userRegister        | new    |
| 2019/3/28 | 新增登录接口 userLogin           | new    |
| 2019/3/28 | userId 由Number类型改为String类型 | update |

### 1.获取用户待办事项

##### 接口功能

> 获取用户待办事项

##### URL

> /todolist/userTodos

##### 支持格式

> JSON

##### HTTP请求方式

> GET

##### 请求参数

|   参数   |  必选  |   类型   |  说明  |
| :----: | :--: | :----: | :--: |
| userId |  Y   | number | 用户ID |



##### 响应参数

>| 返回字段   | 必选   | 类型     |                    说明                    |
>| ------ | ---- | ------ | :--------------------------------------: |
>| code   | Y    | String |             '01'：成功， '02'：失败             |
>| userId | Y    | String |                 返回的用户Id                  |
>| todos  | N    | Array  | [{todoId: 01,status: 02, todoDesc:'吃饭',time:0100000}] |
>| msg    | N    | String |                返回的失败提示信息                 |



##### 接口实例

> ```javascript
> {
>  	code: '001',
>     userId: 1,
>     todos: [
>   		{
>   			todoId: 1,
>           	 todoDesc: '吃饭',
>           	 status: 'Completed',
>              time: 0131131312332131231
> 		}
> 	]
>        
> }
> ```



### 2.新增待办事项

##### 接口功能

> 新增用户待办事项

##### URL

> /todolist/newTodos

##### 支持格式

> JSON

##### HTTP请求方式

> POST

##### 请求参数

| 参数     | 必选   | 类型     | 说明                                       |
| ------ | ---- | ------ | ---------------------------------------- |
| userId | Y    | String | 用户ID                                     |
| todo   | Y    | Object | {todoDesc:'吃饭', time: 000000, status: 'NEW'} |

##### 响应参数

>| 参数      | 必选   | 类型     | 说明     |
>| ------- | ---- | ------ | ------ |
>| code    | Y    | string | 响应编码   |
>| message | N    | string | 错误提示信息 |

###### 示例



> ###### request
>
> ```javascript
> {
>   code: '02',
>   message: '新增待办事项失败'
> }
> ```
>
> ###### response
>
> ```javascript
> {
>   code: '01',
>   userId: 1,
>   todos: [  {todoDesc:'吃饭', time: 000000, status: 'undone'},
>           	{todoDesc:'睡觉', time: 000000, status: 'completed'}
> 		]
> }
> ```

### 修改待办事项

##### 接口功能

> 新增用户待办事项

##### URL

> /todolist/newTodos

##### 支持格式

> JSON

##### HTTP请求方式

> 1. PUT

##### 请求参数

>| 参数     | 必选   | 类型     | 说明      |
>| ------ | ---- | ------ | ------- |
>| userId | Y    | String | 用户ID    |
>| todo   | Y    | object | 修改的待办事务 |

##### 响应参数

> | 参数   | 必选   | 类型     | 说明    |
> | ---- | ---- | ------ | ----- |
> | code | Y    | number | 响应编码  |
> | msg  | N    | String | 响应msg |

### 删除待办事项

##### 接口功能

> 删除用户待办事项

##### URL

> /todolist/Todos

##### 支持格式

> JSON

##### HTTP请求方式

> DELETE

##### 请求参数

> | 参数     | 必选   | 类型     | 说明      |
> | ------ | ---- | ------ | ------- |
> | userId | Y    | String | 用户ID    |
> | todoID | Y    | string | 删除的待办事务 |

##### 响应参数

> | 参数     | 必选   | 类型     | 说明     |
> | ------ | ---- | ------ | ------ |
> | userId | Y    | String | 用户ID   |
> | todos  | Y    | array  | 所有事务   |
> | code   | Y    | string | 响应编码   |
> | msg    | N    | string | 错误提示信息 |



### 获取不同状态下的待办事项

##### 接口功能

> 获取不同状态下的待办事项

##### URL

> /todolist/userTodos/status

##### 支持格式

> JSON

##### HTTP请求方式

> GET

##### 请求参数

> | 参数     | 必选   | 类型     | 说明   |
> | ------ | ---- | ------ | ---- |
> | userId | Y    | number | 用户ID |
> | status | Y    | string | 事务状态 |

##### 响应参数	

> | 返回字段   | 必选   | 类型     |                    说明                    |
> | ------ | ---- | ------ | :--------------------------------------: |
> | code   | Y    | String |             '01'：成功， '02'：失败             |
> | userId | Y    | String |                 返回的用户Id                  |
> | todos  | N    | Array  | [{todoId: 01,status: 02, todoDesc:'吃饭',time:0100000}] |
> | msg    | N    | String |                返回的失败提示信息                 |



### 注册

##### 接口功能

> 用户注册

##### 备注

> 参数非空校验，用户名是否已存在存在校验，随机生成五位数字字符串作为userId。

##### Http请求方式

> POST

##### 请求路径

> /todolist/users/userRegister

##### 请求参数

| 参数       | 必选   | 类型     | 说明   |
| -------- | ---- | ------ | ---- |
| userName | Y    | String | 用户名  |
| email    | Y    | String | 邮箱账号 |
| password | Y    | String | 密码   |

##### 响应参数

| 参数   | 必选   | 类型     | 说明                          |
| ---- | ---- | ------ | --------------------------- |
| code | Y    | String | '01'：成功， '02'：失败            |
| msg  | Y    | String | 注册成功 or 注册失败（说明失败原因）        |
| user | N    | Object | {userId, userName},注册成功必须返回 |



### 登录

##### 接口功能

> 用户注册

##### Http请求方式

> POST

##### 请求路径

> /todolist/users/userLogin

##### 请求参数

| 参数       | 必选   | 类型     | 说明   |
| -------- | ---- | ------ | ---- |
| userName | Y    | String | 用户名  |
| password | Y    | String | 用户密码 |

##### 响应参数

| 参数   | 必选   | 类型     | 说明                 |
| ---- | ---- | ------ | ------------------ |
| code | Y    | String | 01登录成功 02 登录失败     |
| msg  | N    | String | 失败必选返回失败原因         |
| user | Y    | Object | {userName, userId} |

##### 备注

> 对输入参数 userId和password作非空校验, 为空时msg:“用户名或密码不能为空”。用户名密码不匹配时返回msg: “用户名或密码错误”