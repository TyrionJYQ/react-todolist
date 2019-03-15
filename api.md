目录

### 1.获取用户待办事项

### 2.新增待办事项

### 3.删除待办事项

### 4.修改待办事项



------



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

|   参数   |  必选  |   类型   |   说明   |
| :----: | :--: | :----: | :----: |
| userId |  Y   | number |  用户ID  |
| status |  Y   | string | 待办事项状态 |



##### 响应参数

>| 返回字段   | 必选   | 类型     |                    说明                    |
>| ------ | ---- | ------ | :--------------------------------------: |
>| code   | Y    | String |             '01'：成功， '02'：失败             |
>| userId | Y    | number |                 返回的用户Id                  |
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

| 参数     | 必选   | 类型     | 说明                              |
| ------ | ---- | ------ | ------------------------------- |
| userId | Y    | Number | 用户ID                            |
| todos  | Y    | Array  | [{todoDesc:'吃饭', time: 000000}] |

##### 响应参数

>| 参数     | 必选   | 类型     | 说明   |
>| ------ | ---- | ------ | ---- |
>| code   | Y    | string | 响应编码 |
>| userId | Y    | string | 用户ID |
>| todos  | Y    | array  | 用户所有 |

###### 示例



> ###### request
>
> ```javascript
> {
>   userId: 1,
>   todos: [{todoDesc:'吃饭', time: 000000, status: 'undone'}]
> }
> ```
>
> ###### response
>
> ```javascript
> {
>   code: '001',
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
>| userId | Y    | number | 用户ID    |
>| todo   | Y    | object | 修改的待办事务 |

##### 响应参数

> | 参数     | 必选   | 类型     | 说明   |
> | ------ | ---- | ------ | ---- |
> | userId | Y    | number | 用户ID |
> | todos  | Y    | array  | 所有事务 |
> | code   | Y    | string | 响应编码 |

##### 删除待办事项

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
> | userId | Y    | number | 用户ID    |
> | todoID | Y    | string | 删除的待办事务 |

##### 响应参数

> | 参数     | 必选   | 类型     | 说明     |
> | ------ | ---- | ------ | ------ |
> | userId | Y    | number | 用户ID   |
> | todos  | Y    | array  | 所有事务   |
> | code   | Y    | string | 响应编码   |
> | msg    | N    | string | 错误提示信息 |

