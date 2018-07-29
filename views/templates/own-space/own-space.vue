<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                Личная информация
            </p>
            <div>
                <Form
                        ref="userForm"
                        :model="userForm"
                        :label-width="100"
                        label-position="right"
                        :rules="inforValidate"
                >
                    <FormItem label="Имя：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="Телефон：" prop="cellphone">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.email"></Input>
                        </div>

                    </FormItem>
                    <FormItem label="Изменить пароль：">
                        <Button type="text" size="small" @click="showEditPassword">Нажмите чтобы изменить пароль
                        </Button>
                    </FormItem>
                    <div>
                        <Button type="text" @click="cancelEditUserInfor">Отменить</Button>
                        <Button type="primary" :loading="save_loading" @click="saveEdit">Сохранить изменения</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">Изменение пароля</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
                  :rules="passwordValidate">
                <FormItem label="Старый пароль" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="Введите старый пароль"></Input>
                </FormItem>
                <FormItem label="Новый пароль" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="Введите новый пароль"></Input>
                </FormItem>
                <FormItem label="Проверка" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="Повторите новый пароль"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">Закрыть</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">Обновить пароль</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'ownspace_index',
        data() {
            const validePhone = (rule, value, callback) => {
                var re = /^1[0-9]{10}$/;
                if (!re.test(value)) {
                    callback(new Error('Пожалуйста, введите правильный формат номера телефона'));
                } else {
                    callback();
                }
            };
            const valideRePassword = (rule, value, callback) => {
                if (value !== this.editPasswordForm.newPass) {
                    callback(new Error('Дважды введите пароль несовместимы'));
                } else {
                    callback();
                }
            };
            return {
                userForm: {
                    name: '',
                    cellphone: '',
                    company: '',
                    department: ''
                },
                uid: '', // 登录用户的userId
                phoneHasChanged: false, // 是否编辑了手机
                save_loading: false,
                identifyError: '', // 验证码错误
                editPasswordModal: false, // 修改密码模态框显示
                savePassLoading: false,
                oldPassError: '',
                identifyCodeRight: false, // 验证码是否正确
                hasGetIdentifyCode: false, // 是否点了获取验证码
                canGetIdentifyCode: false, // 是否可点获取验证码
                checkIdentifyCodeLoading: false,
                inforValidate: {
                    name: [
                        {required: true, message: 'Пожалуйста, введите имя\n', trigger: 'blur'}
                    ],
                    cellphone: [
                        {required: true, message: 'Пожалуйста, введите номер телефона\n'},
                        {validator: validePhone}
                    ]
                },
                editPasswordForm: {
                    oldPass: '',
                    newPass: '',
                    rePass: ''
                },
                passwordValidate: {
                    oldPass: [
                        {required: true, message: 'Пожалуйста, введите старый пароль', trigger: 'blur'}
                    ],
                    newPass: [
                        {required: true, message: 'Пожалуйста, введите новый пароль', trigger: 'blur'},
                        {min: 6, message: 'Пожалуйста, введите не менее 6 символов', trigger: 'blur'},
                        {max: 32, message: 'Введите до 32 символов\n', trigger: 'blur'}
                    ],
                    rePass: [
                        {required: true, message: 'Пожалуйста, еще раз введите новый пароль\n', trigger: 'blur'},
                        {validator: valideRePassword, trigger: 'blur'}
                    ]
                },
                initPhone: '',
            };
        },
        methods: {
            showEditPassword() {
                this.editPasswordModal = true;
            },
            cancelEditUserInfor() {
                this.$store.commit('removeTag', 'ownspace_index');
                localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
                let lastPageName = '';
                if (this.$store.state.app.pageOpenedList.length > 1) {
                    lastPageName = this.$store.state.app.pageOpenedList[1].name;
                } else {
                    lastPageName = this.$store.state.app.pageOpenedList[0].name;
                }
                this.$router.push({
                    name: lastPageName
                });
            },
            saveEdit() {
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        this.saveInfoAjax();
                    }
                });
            },
            cancelEditPass() {
                this.editPasswordModal = false;
            },
            saveEditPass() {
                this.$refs['editPasswordForm'].validate((valid) => {
                    if (valid) {
                        this.savePassLoading = true;
                        // you can write ajax request here
                    }
                });
            },
            init() {
                this.userForm.name = 'Max Voitsekhovsky';
                this.userForm.cellphone = '17712345678';
                this.initPhone = '17712345678';
                this.userForm.company = 'CodewebSpace';
                this.userForm.department = 'Programming';
            },
            cancelInputCodeBox() {
                this.inputCodeVisible = false;
                this.userForm.cellphone = this.initPhone;
            },
            // submitCode () {
            //     let vm = this;
            //     vm.checkIdentifyCodeLoading = true;
            //     if (this.securityCode.length === 0) {
            //         this.$Message.error('请填写短信验证码');
            //     } else {
            //         setTimeout(() => {
            //             this.$Message.success('验证码正确');
            //             this.inputCodeVisible = false;
            //             this.checkIdentifyCodeLoading = false;
            //         }, 1000);
            //     }
            // },

            saveInfoAjax() {
                this.save_loading = true;
                setTimeout(() => {
                    this.$Message.success('Успешно сохранено');
                    this.save_loading = false;
                }, 1000);
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
