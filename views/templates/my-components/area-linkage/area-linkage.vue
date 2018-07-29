<style lang="less">
    @import './area-linkage.less';
    @import '../../../../styles/common.less';
</style>

<template>
    <div>
        <Row :gutter="10">
            <Col span="17">
            <Card>
                <p slot="title">
                    <Icon type="minus-round"></Icon>
                    Простой пример
                </p>
                <Row class="area-linkage-page-row1">
                    <al-selector
                            v-model="resDefault"
                            level="3"
                            auto
                    />
                    <pre>
&lt;al-selector v-model="resDefault" /&gt;
                        </pre>
                    <al-cascader
                            v-model="res1"
                            style="margin-top:20px;width:50%;"
                    />
                    <pre>
&lt;al-cascader v-model="res1" /&gt;
                        </pre>
                    <div>
                        <p>Более подробная концигурация здесь：<a href="https://github.com/iview/iview-area" target="_block">iview-area</a>
                        </p>
                    </div>
                </Row>
            </Card>
            </Col>
            <Col span="7">
            <Card>
                <p slot="title">
                    <Icon type="stats-bars"></Icon>
                    Данные
                </p>
                <Row class="area-linkage-page-row1">
                        <pre style="font-size:12px;">
{{ showRes }}
                        </pre>
                </Row>
            </Card>
            </Col>
        </Row>
        <Row class="margin-top-10" :gutter="10">
            <Col span="3">
            <Card>
                <p slot="title">
                    Первый уровень
                </p>
                <al-selector v-model="res1" level="0"/>
            </Card>
            </Col>
            <Col span="5">
            <Card>
                <p slot="title">
                   Второй уровень
                </p>
                <al-selector v-model="res1" level="1"/>
            </Card>
            </Col>
            <Col span="7">
            <Card>
                <p slot="title">
                   Третий уровень
                </p>
                <al-selector v-model="res1" data-type="code" level="2"/>
            </Card>
            </Col>
            <Col span="9">
            <Card>
                <p slot="title">
                    Четвертый уровень
                </p>
                <al-selector v-model="res1" data-type="name" level="3"/>
            </Card>
            </Col>
        </Row>
        <Row class="margin-top-10" :gutter="10">
            <Col span="8">
            <Card>
                <p slot="title">
                    Отключение указанного уровня
                </p>
                <al-selector v-model="res1" :disabled="2" level="3"/>
            </Card>
            </Col>
            <Col span="4">
            <Card>
                <p slot="title">
                    Четыре выпадающих уровня
                </p>
                <al-cascader v-model="res1" level="3"/>
            </Card>
            </Col>
            <Col span="4">
            <Card>
                <p slot="title">
                    Три выпадающих уровня
                </p>
                <al-cascader v-model="res1" level="2"/>
            </Card>
            </Col>
            <Col span="4">
            <Card>
                <p slot="title">
                    Два выпадающих уровня
                </p>
                <al-cascader v-model="res1" data-type="name" level="1"/>
            </Card>
            </Col>
            <Col span="4">
            <Card>
                <p slot="title">
                    Один уровень
                </p>
                <al-cascader v-model="res1" data-type="code" level="0"/>
            </Card>
            </Col>
        </Row>
        <Row class="margin-top-10" :gutter="10">
            <Col span="4">
            <Card>
                <p slot="title">
                    三种尺寸
                </p>
                <al-selector v-model="res1" size="large" level="0"/>
                <al-selector style="margin-top:10px;" v-model="res1" size="default" level="0"/>
                <al-selector style="margin-top:10px;" v-model="res1" size="small" level="0"/>
            </Card>
            </Col>
            <Col span="4">
            <Card>
                <p slot="title">
                    Три вертикальных уровня
                </p>
                <al-cascader v-model="res1" size="large" level="1"/>
                <al-cascader style="margin-top:10px;" v-model="res1" level="1"/>
                <al-cascader style="margin-top:10px;" v-model="res1" size="small" level="1"/>
            </Card>
            </Col>
            <Col span="4">
            <Card>
                <p slot="title">
                    Пользовательский Формат отображения
                </p>
                <Row class="area-linkage-page-row2">
                    <al-cascader
                            v-model="res1"
                            size="large"
                            level="3"
                            placeholder="这是级联模式"
                            :render-format="label => label.join(' > ')"
                    />
                </Row>
            </Card>
            </Col>
            <Col span="12">
            <Card>
                <p slot="title">
                    С поиском
                </p>
                <Row class="area-linkage-page-row2">
                    <al-selector
                            :value="res1"
                            searchable
                    />
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    // import alSelector from './components/al-selector.vue';
    // import alCascader from './components/al-cascader.vue';

    import Vue from 'vue';
    import iviewArea from 'iview-area';

    Vue.use(iviewArea);

    export default {
        // components: {
        //     alSelector,
        //     alCascader
        // },
        data() {
            return {
                res1: [],
                resDefault: ['Провинция Хэбэй', 'Города Чжанцзякоу', 'Первый', 'Песок городах'],
                showRes: []
            };
        },
        methods: {
            renderFormat(label) {
                return label.join(' => ');
            }
        },
        watch: {
            res1(val) {
                this.showRes = val;
            },
            resDefault(val) {
                this.showRes = val;
            }
        }
    };
</script>
