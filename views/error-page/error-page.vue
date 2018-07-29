<style lang="less">
    @import '../../../styles/common.less';
    @import './error-page.less';
</style>

<template>
    <div class="error-page">
        <Row>
            <Card>
                <p slot="title">
                    <Icon :size="14" type="ios-navigate-outline"></Icon>
                    404
                </p>
                <Row>
                    <Col span="10">
                        <Card dis-hover>
                            <Row>
                                <div class="error-page-show">
                                    <error404></error404>
                                </div>
                                <div class="error-page-cover"></div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                        <Row type="flex" align="middle" class="error-page-intro-con">
                            <p>При обращении к странице, которой не существует перейдете на страницу 404, вы можете в адресной строке браузера URL-адрес на несуществующий путь, чтобы ощутить эффект</p>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="android-lock"></Icon>
                    403
                </p>
                <Row>
                    <Col span="10">
                        <Card dis-hover>
                            <Row>
                                <div class="error-page-show">
                                    <error403></error403>
                                </div>
                                <div class="error-page-cover"></div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                        <Row type="flex" align="middle" class="error-page-intro-con">
                            <p>В текущем пользователю не придется выполнять текущую операцию разрешения, чтобы перейти на страницу, вы можете быть в AJAX-запрос методом определяют, является ли возвращенный код состояния 403 когда перейти на страницу</p>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="social-freebsd-devil"></Icon>
                    500
                </p>
                <Row>
                    <Col span="10">
                        <Card dis-hover>
                            <Row>
                                <div class="error-page-show">
                                    <error500></error500>
                                </div>
                                <div class="error-page-cover"></div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                        <Row type="flex" align="middle" class="error-page-intro-con">
                            <p>Когда запрос происходит после окончания службы ошибки, чтобы перейти на страницу, вы можете быть в методе AJAX-запрос определяет, является ли возвращенный код состояния 500, когда вы перейти на страницу</p>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import Error404 from './404.vue';
import Error500 from './500.vue';
import Error403 from './403.vue';
export default {
    components: {
        Error404,
        Error500,
        Error403
    }
};
</script>
