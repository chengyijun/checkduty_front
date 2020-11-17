<template>
    <div class="home">
        <!--  多文件上传 multiple="multiplt" -->
        <!--    <input type="file" id="fileExport" @change="handleFileChange" ref="inputer" multiple="multiplt">-->
        <input type="file" id="fileExport" @change="handleFileChange" ref="inputer">
        <button @click="btnClick">上传</button>
        <h4>{{info}}</h4>
        <button id="download" :disabled="disabled" v-show="show" @click="download">下载考勤结果</button>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        name: 'home',
        data() {
            return {
                info: '请上传考勤原始Excel文件',
                download_url: null,
                disabled: true,
                show: false,
                api: 'http://192.168.10.129:5000/api'
            }
        },
        methods: {
            download() {
                // 动态创建下载标签
                let a = document.createElement('a')
                const download = document.getElementById('download')
                download.appendChild(a)
                a.href = this.download_url
                a.click();

            },

            handleFileChange(e) {
                // console.log(e.target.files)
                let inputDOM = this.$refs.inputer;
                this.file = inputDOM.files[0];// 通过DOM取文件数据
                let size = Math.floor(this.file.size / 1024);//计算文件的大小　
                this.formData = new FormData();//new一个formData事件
                this.formData.append("file", this.file); //将file属性添加到formData里
                //此时formData就是我们要向后台传的参数了
                console.log(this.file);
            },

            btnClick() {
                axios({
                    method: 'post',
                    url: this.api + '/upload',
                    data: this.formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {

                    // this.info = response.data.info
                    this.info = '极速处理中，请稍后...'
                    // 发送处理请求
                    axios({
                        method: 'get',
                        url: this.api + '/result',
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.info = '考勤数据处理完毕，请下载考勤结果文件...'
                            this.download_url = res.data.info
                            // 让下载按启用
                            this.disabled = false
                            this.show = true
                            // 清除上传文件
                            let input = document.getElementById('fileExport')
                            input.value = null
                        }
                    }).catch(error => {
                        console.log(error)
                    })

                }).catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            }
        },
        components: {}
    }
</script>


<style>
    .home {
        /*background-color: lightblue;*/
        width: 30%;
        margin: 50px auto;
    }
</style>