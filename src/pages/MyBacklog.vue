<template>
    <div id="backlog" @click="InputFocusKey">
        <!-- an transparent input,which is used to control the keyboard -->
        <input type="text" id="key_input" ref="keyInput" @keyup.space="AddBacklog">
        <div class="backlog_title">
            <span class="backlog_title_span">我的待办</span>
            <div :class="addBacklog" @click="AddBacklog">新建待办</div>
            <!-- the content for the add backlog that clicked -->
            <input type="text" ref="inputTitle" id="add_backlog_input"
                v-if="flag" 
                v-model="item" 
                @keydown.enter="setItem" 
                @keyup.left="isActiveLeft"
                @keyup.right="isActiveRight"
                @keyup.esc="CancelAddBacklog"
                @keyup.down="InputFocusElementUI">
            <div class="elementui_time" v-if="flag" >
                 <el-time-picker
                    v-model="elementuiDate"
                    :picker-options="{
                        selectableRange: '00:00:00 - 11:59:59'
                    }"
                    placeholder="任意时间点"
                    ref="elementTimeInput"
                    @blur="InputFocus"
                    value-format="hh:mm:ss">
                </el-time-picker>
            </div>
            <div class="add_backlog_color" v-if="flag">
                <span class="span1" @click="spanClicked1" :class="{active: isActive === 1}"></span>
                <span class="span2" @click="spanClicked2" :class="{active: isActive === 2}"></span>
                <span class="span3" @click="spanClicked3" :class="{active: isActive === 3}"></span>
                <span class="span4" @click="spanClicked4" :class="{active: isActive === 4}"></span>
            </div>
            <div class="add_backlog_date"
                v-if="flag"
            >长计划</div>
            <div class="add_backlog_ensure"
                v-if="flag"
                @click="setItem"
            >确定</div>
            <div 
                class="add_backlog_cancel"
                v-if="flag"
                @click="CancelAddBacklog"
            >取消</div>
        </div>
        <!-- time content -->
        <div class="backlog_data"></div>
        <!-- list content -->
        <div class="backlog_todolist">
            <div class="backlog_todolist_item" v-for="item in todoList" :key="item.id">
                <!-- color -->
                <div class="sticky_note" :style="{backgroundColor: item.color}"></div>
                <div class="backlog_finish"></div>
                <span class="todolist_item_span" >{{item.item}}</span>
                <div class="todolist_item_bottom"></div>
                <div class="todolist_item_count_down">
                    <span class="count_down_day">today</span>
                    <span class="count_down_hour">{{item.h}}</span>
                    <span class="count_down_min">{{item.min}}</span>
                </div>
                <!-- delete item -->
                <div class="todolist_item_delete" @click="deleteTodos(item.id)">
                    <span class="todolist_item_delete_span"></span>
                </div>
            </div>
        </div>
        <DataView></DataView>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid'
    import DataView from '../components/DataView'

    export default {
        data(){
            return{
                addBacklog: 'add_backlog'+ ' ' + 'add_backlog_native',
                // flag is used for judge the create new backlog button is clicked or not
                flag: false,
                item:'',
                //note color sign
                isActive: 1,
                elementuiDate: new Date(2022, 2, 6, 0, 0,0),
            }
        },
        props:['todos','todoList','addTodo','deleteTodo'],
        components: {DataView},
        methods: {
            // control the focus for input
            InputFocus(){
                if(this.flag){
                    this.$nextTick(function(){
                        this.$refs.inputTitle.focus();
                    })
                }
            },
            InputFocusKey(){
                if(!this.flag){
                    this.$nextTick(function(){
                        this.$refs.keyInput.focus()
                    })
                }
            },
            InputFocusElementUI(){
                if(this.flag){
                    this.$nextTick(function(){
                        this.$refs.elementTimeInput.focus();
                    })
                }
            },
            AddBacklog(){
                if(this.flag === false){
                    this.addBacklog = 'add_backlog' + ' ' + 'add_backlog_clicked'
                    setTimeout(() => {
                        this.flag = !this.flag
                        // get the focus in input
                        this.InputFocus()
                    }, 680);
                }
            },
            // cancel button
            CancelAddBacklog(){
                if(this.flag === true){
                    this.addBacklog = 'add_backlog' + ' ' + 'add_backlog_native'
                    this.flag = !this.flag
                }
                this.InputFocusKey()
            },
            // add an item for todoList which is in the App.vue
            setItem(){
                // Sun Mar 06 2022 00:00:00 GMT+0800 (中国标准时间)
                if(String(this.elementuiDate).split(' ')[4] === '00:00:00'){
                    this.open2()
                }
                else if(this.item === ''){
                    this.open4()
                }
                else{
                    // format the ending time
                    const timelist = this.elementuiDate.split(':')
                    const h = Number(timelist[0])
                    const min = Number(timelist[1])
                    const s = Number(timelist[2])
                    // set an item
                    const todoObj = {id:nanoid(),item:this.item,color: this.$store.state.color,h:h,min:min,s:s}
                    // empty input
                    this.item=''
                    // convert item to string
                    localStorage.setItem('loglevel:webpack-dev-server',JSON.stringify('SILENT'))
                    // recover
                    this.addTodo(todoObj)
                    // call the cancel button
                    this.CancelAddBacklog()
                    // succeed tip
                    this.open1()
                }
            },
            deleteTodos(id){
                this.deleteTodo(id)
            },
            // choose one color for item,the default color is red
            spanClicked1(){
                this.isActive = 1
                this.InputFocus()
            },
            spanClicked2(){
                this.isActive = 2
                this.InputFocus()
            },
            spanClicked3(){
                this.isActive = 3
                this.InputFocus()
            },
            spanClicked4(){
                this.isActive = 4
                this.InputFocus()
            },
            // change the sticky note color 
            isActiveLeft(){
                if(this.isActive === 1){
                    this.isActive = 4
                }
                else{
                    this.isActive -= 1
                }
            },
            isActiveRight(){
                if(this.isActive === 4){
                    this.isActive = 1
                }
                else{
                    this.isActive += 1
                }
            },
            open1() {
                this.$notify({
                title: '成功',
                message: '成功添加一条信息',
                type: 'success'
                });
            },
            open2() {
                this.$notify({
                title: '警告',
                message: '请填入时间',
                type: 'warning'
                });
            },
            open4() {
                this.$notify.error({
                title: '错误',
                message: '请输入内容'
                });
            }
        },
        watch: {
            // watch isActive and commit the sticky note color to vuex mutations
            isActive: {
                handler(){
                    if(this.isActive === 1){
                        this.$store.commit('ChangeBlue')
                    }
                    else if(this.isActive === 2){
                        this.$store.commit('ChangeGreen')
                    }
                    else if(this.isActive === 3){
                        this.$store.commit('ChangeRed')
                    }else {
                        this.$store.commit('ChangeYellow')
                    }
                }
            },
        },
        mounted(){
            if(!this.flag){
                this.InputFocusKey()
            }
        }
    }


</script>

<style scoped>
    #backlog {
        display: inline-block;
        margin-left: 250px;
        width: 800px;
        height: 800px;
    }

    /* an transparent input */
    input#key_input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .backlog_title {
        position: relative;
        width: 100%;
        height: 170px;
    }

    .backlog_title span.backlog_title_span {
        position: absolute;
        top: 130px;
        left: 0;
        font-size: 2em;
    }

    /* thte style for native add backlog */

    .backlog_title .add_backlog {
        cursor: pointer;
        position: absolute;
        text-align: center;
        line-height: 35px;
        border-radius: 20px;
        transition: all 0.8s ease-in-out;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .backlog_title .add_backlog_native {
        top: 135px;
        left: 620px;
        width: 180px;
        height: 35px;
        color: rgb(246, 246, 248);
        background-color: seagreen;
    }

    /* the style for add backlog that clicked */

    .add_backlog_clicked {
        cursor: default!important;
        top: 105px;
        left: 0;
        height: 190px;
        width: 100%;
        color: #515151;
        background-color: rgb(246, 246, 248);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    input#add_backlog_input {
        position: absolute;
        top: 160px;
        left: 50px;
        width: 700px;
        height: 50px;
        font-size: 1.6em;
        text-indent: 1em;
        border-radius: 20px;
        border: 2px solid #7b7b7b;
    }

    input:focus {
        border: 2px solid #7b7b7b;
    }

    .elementui_time {
        position: absolute;
        top: 240px;
        left: 50px;
    }

    .add_backlog_color {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        top: 235px;
        left: 300px;
        width: 150px;
        height: 50px;
    }

    .add_backlog_color span {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
    }

    span.active {
        border-radius: 13px;
        border: 3px solid #666363;
    }

    .span1 {background-color: rgb(103, 103, 184)}
    .span2 {background-color: seagreen}
    .span3 {background-color: rgb(199, 106, 106)}
    .span4 {background-color:rgb(224, 221, 11)}

    .add_backlog_date {
        cursor: pointer;
        position: absolute;
        top: 245px;
        left: 500px;
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        font-size: 0.9em;
        font-weight: 600;
        border: 1px solid #515151;
        color: #515151;
    }

    .add_backlog_ensure {
        cursor: pointer;
        position: absolute;
        top: 245px;
        left: 608px;
        width: 65px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        font-size: 0.9em;
        font-weight: 600;
        border: 1px solid #515151;
        color: #515151;
    }

    .add_backlog_cancel {
        cursor: pointer;
        position: absolute;
        top: 245px;
        left: 700px;
        width: 65px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        font-size: 0.9em;
        font-weight: 600;
        border: 1px solid #515151;
        color: #515151;
    }

    /* backlog date */

    .backlog_data {
        margin-top: 20px;
        width: 100%;
        height: 100px;
        border-radius: 20px;
        background-color: rgb(246, 246, 248);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    /* backlog todolist */

    .backlog_todolist {
        margin-top: 20px;
        width: 100%;
        height: 600px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: rgb(246, 246, 248);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .backlog_todolist_item {
        position: relative;
        width: 100%;
        height: 68px;
    }

    .backlog_todolist_item .sticky_note {
        position: absolute;
        top: 14px;
        left: 18px;
        width: 5px;
        height: 36px;
        border-radius: 3px;
    }

    .backlog_todolist_item .backlog_finish {
        position: absolute;
        left: 50px;
        top: 20px;
        width: 20px;
        height: 20px;
        border: 2px solid #515151;
    }

    .backlog_todolist_item span.todolist_item_span {
        position: absolute;
        top: 8px;
        left: 95px;
        font-size: 1.5em;
        font-weight: 300;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
    }

    .backlog_todolist_item .todolist_item_bottom {
        position: absolute;
        top: 65px;
        left: 50px;
        width: 710px;
        height: 2px;
        border-radius: 1px;
        background-color: rgb(105, 104, 104,0.5);
    }

    .backlog_todolist_item .todolist_item_count_down {
        position: absolute;
        left: 88px;
        top: 37px;
        /* width: 77px; */
        height: 15px;
        border-radius: 2px;
    }

    .backlog_todolist_item .todolist_item_count_down>span {
        display: inline-block;
        font-size: 0.8em;
        color: rgb(1,1,1,0.5)
    }

    .backlog_todolist_item .todolist_item_count_down span.count_down_day {
        height: 15px;
        text-align: center;
        line-height: 15px;
        margin-right: 5px;
        margin-left: 9px;
    }

    .backlog_todolist_item .todolist_item_count_down span.count_down_hour {
        width: 25px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        border-left: 1px solid rgb(105, 104, 104,0.3);
        border-right: 1px solid rgb(105, 104, 104,0.3);
    }

    .backlog_todolist_item .todolist_item_count_down span.count_down_min {
        width: 25px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        border-right: 1px solid rgb(105, 104, 104,0.3);
    }

    .backlog_todolist_item .todolist_item_delete {
        position: absolute;
        top: 18px;
        left: 730px;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-size: 100% 100%;
        background-color:rgb(199, 106, 106);
        transition: all 0.2s;
    }

    .backlog_todolist_item .todolist_item_delete:hover {
        background-color: rgb(246, 246, 248);
        border: 2px solid rgb(199, 106, 106);
    }

    .todolist_item_delete span.todolist_item_delete_span {
        display: inline-block;
        margin-left: 6px;
        margin-top: 12px;
        width: 18px;
        height: 5px;
        border-radius: 2px;
        background-color: rgb(246, 246, 248);
        transition: all 0.2s;
    }

    .backlog_todolist_item .todolist_item_delete:hover span.todolist_item_delete_span {
        background-color: rgb(199, 106, 106);
    }


</style>