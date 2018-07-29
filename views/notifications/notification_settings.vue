<style lang="less">
    @import './notifications.less';
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Row>
            <Row>
                <Button type="success" shape="circle" size="large" @click="save" class="margin-left-10">Сохранить
                </Button>
            </Row>

        </Row>
        <Row>
            <Col span="12">
            <Card class="margin-left-10 margin-top-10">
                <p slot="title">Главная страница</p>
                <Input v-model="settings.mail.index" placeholder="Введите email через запятую"></Input>
            </Card>
            </Col>

            <Col span="12">
            <Card class="margin-left-10 margin-top-10">
                <p slot="title">Контакты</p>
                <Input v-model="settings.mail.contact" placeholder="Введите email через запятую"></Input>
            </Card>
            </Col>

            <Col span="12">
            <Card class="margin-left-10 margin-top-10">
                <p slot="title">Курсы</p>
                <Input v-model="settings.mail.course" placeholder="Введите email через запятую"></Input>
            </Card>
            </Col>

        </Row>
    </div>
</template>

<script>
    export default {
        name: 'notifications_settings',
        data() {
            return {
                settings: {
                    mail: {
                        index: null,
                        contact: null,
                        course: null
                    }
                }
            };
        },
        created: function () {
          this.init();
        },
        methods: {
            init(){
                // id  = 1  это условно для получения email-json;
                this.axios.get('/api/settings/' + 1 + '/edit',).then((response) => {
                    console.log(response.data);
                    this.settings = response.data;
                });
            },
            save() {
                console.log(this.settings);
                this.axios.put('/api/settings/' + 1, this.settings).then((response) => {
                  console.log(response.data);
                  if(response.data==1){
                      this.$Notice.success({
                          title: 'Успешно сохранено',
                          desc: 'Данные обновлены'
                      });
                  }
                });
            }
        }
    };
</script>

