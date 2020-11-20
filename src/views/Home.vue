<template>
    <div class="container">
        <div class="home">
            <!--  多文件上传 multiple="multiplt" -->
            <!--    <input type="file" id="fileExport" @change="handleFileChange" ref="inputer" multiple="multiplt">-->
            <input type="file" id="fileExport" @change="handleFileChange" ref="inputer" style="display: none">


            <div class="row">
                <input id="photoCover" type="text" class="form-control col-md-10">
                <button id="scanbtn" class="btn  btn-primary col-md-1 pull-right" @click="myclick">
                    浏览
                </button>
                <button id="uploadbtn" class="btn btn-success disabled col-md-1 pull-right" @click="btnClick">
                    上传
                </button>
            </div>
            <div class="row">
                <div class="alert alert-info col-md-12">
                    <strong>{{info}}</strong>
                </div>
            </div>
            <div class="row">
                <button id="download" class="btn btn-primary col-md-12" :disabled="disabled" v-show="show"
                        @click="download">
                    下载考勤结果
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {upload, result} from "../network/home";
    import $ from 'jquery'

    const a = document.createElement('a')
    a.onclick = function (e) {
        // 阻止超链接的点击事件 冒泡到父节点
        e.stopPropagation()
    }

    export default {
        name: 'home',
        data() {
            return {
                info: '请上传考勤原始Excel文件',
                download_url: null,
                disabled: true,
                show: false
            }
        },
        methods: {

            myclick() {
                $('#fileExport').click();
            },
            download() {
                const downloadbtn = document.getElementById('download')
                // 移除子dom
                for (const child of downloadbtn.childNodes) {
                    if (child.tagName === 'A')
                        downloadbtn.removeChild(child)
                }
                downloadbtn.appendChild(a)
                a.href = this.download_url
                a.click()
            },

            handleFileChange(e) {
                const files = e.target.files
                // let inputDOM = this.$refs.inputer;
                // this.file = inputDOM.files[0];// 通过DOM取文件数据
                this.file = files[0]
                let size = Math.floor(this.file.size / 1024);//计算文件的大小　
                this.formData = new FormData();//new一个formData事件
                this.formData.append("file", this.file); //将file属性添加到formData里
                //此时formData就是我们要向后台传的参数了
                // console.log(this.file.name);
                // 为明处上传文本框赋值 文件路径
                $('#photoCover').val(this.file.name)
                // 启用上传按钮
                $('#uploadbtn').removeClass('disabled')


            },

            btnClick() {
                // 如果没有选择上传文件 就不执行上传请求了
                if ($('#photoCover').val() === '')
                    return

                // 发送上传文件请求
                upload(this.formData).then(response => {
                    // this.info = response.info
                    this.info = '极速处理中，请稍后...'
                    // 文件上传成功之后 发送处理文件请求
                    result().then(res => {
                        if (res.code === 1) {
                            this.info = '考勤数据处理完毕，请下载考勤结果文件...'
                            this.download_url = res.info
                            // 启用上传按钮
                            $('#uploadbtn').addClass('disabled')
                            // 启用并显示下载按钮
                            this.disabled = false
                            this.show = true
                            // 清除上传文件
                            let input = document.getElementById('photoCover')
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
    .container {
        margin: 50px auto;
    }

    .row {
        margin: 10px 0;
    }

</style>