<template>
    <div id="app">
        <LeftNav/>
        <router-view :todoList="todoList" :addTodo="addTodo" :deleteTodo="deleteTodo"></router-view>
    </div>
    
</template>

<script>
    import LeftNav from './components/LeftNav'

    export default {
        data(){
            return {
                todoList: JSON.parse(localStorage.getItem('item')) || []
            }
        },
        components: {
            LeftNav,
        },
        methods: {
            addTodo(value){
                this.todoList.unshift(value)
            },
            deleteTodo(id){
                this.todoList = this.todoList.filter( todo => todo.id !== id )
            }
        },
        watch: {
            todoList: {
                deep: true,
                handler(value){
                    localStorage.setItem('item',JSON.stringify(value));
                }
            }
        },created(){
/*             setTimeout(() => {
                setInterval(() => {
                    for(let i = 0;i < this.todoList.length;i++){
                        this.todoList[i].h += 1
                    }
                }, 1000)
            }, 200); */
        }
    }
</script>

<style>

    * {
        padding: 0;
        margin: 0;
        font-family: YouYuan;
        font-weight: 600;
        color: #515151;
    }

    a {
        text-decoration: none;
    }

    body,
    html {
        width: 100%;
        height: 100%;
        background-color: rgb(222, 222, 230);
    }

    /* general content */

    #app {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
</style>