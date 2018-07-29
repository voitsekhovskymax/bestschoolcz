<style lang="less">
    @import '../../../../styles/common.less';
    @import 'draggable-list.less';
</style>

<template>
    <div>
        <Row>
            <Col span="16">
                <Card>
                    <Row>
                        <Col span="12">
                            <Card dis-hover>
                                <p slot="title">
                                    <Icon type="ios-list-outline"></Icon>
                                   Список основных задач
                                </p>
                                <div style="height: 360px;">
                                    <ul id="doList" class="iview-admin-draggable-list"></ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span="12" class="padding-left-10">
                            <Card dis-hover>
                                <p slot="title">
                                    <Icon type="ios-list"></Icon>
                                   Список всех задач
                                </p>
                                <div style="height: 360px;">
                                    <ul id="todoList" class="iview-admin-draggable-list">
                                        <li v-for="(item, index) in todoArray" :key="index" class="notwrap todolist-item" :data-index="index">
                                            {{ item.content }}
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="ios-paper-outline"></Icon>
                        Выбранные задачи
                    </p>
                    <div style="height: 394px;">
                        <ul class="iview-admin-draggable-list">
                            <li v-for="(item, index) in doArray" :key="index" class="notwrap" :data-index="index">
                                {{ item.content }}
                            </li>
                        </ul>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="16">
                <Card>
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        Список с прокруткой
                    </p>
                    <Row>
                        <Col span="12">
                            <Card dis-hover>
                                <div style="height: 360px;">
                                    <ul id="affordList" class="iview-admin-draggable-list"></ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span="12" class="padding-left-10">
                            <Card dis-hover>
                                <div style="height: 360px;">
                                    <ul id="shoppingList" class="iview-admin-draggable-list">
                                        <li v-for="(item, index) in shoppingList" :key="index" class="notwrap todolist-item" :data-index="index">
                                            Купить -- {{ item.name }}
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-funnel"></Icon>
                        Список покупок
                    </p>
                    <div style="height: 394px;">
                        <ul class="iview-admin-draggable-list">
                            <li v-for="(item, index) in affordList" :key="index" class="notwrap" :data-index="index">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    name: 'draggable-list',
    data () {
        return {
            todoArray: [
                {
                    content: 'Angular'
                },
                {
                    content: 'React'
                },
                {
                    content: 'Vue'
                },
                {
                    content: 'Django'
                },
                {
                    content: 'Express'
                },
                {
                    content: 'Native'
                },
                {
                    content: 'Node'
                },
                {
                    content: 'Mongo'
                }
            ],
            doArray: [],
            shoppingList: [
                {name: 'Процессор'},
                {name: 'Монитор'},
                {name: 'Видеокарта'},
                {name: 'Оперативная память'},
                {name: 'Клавиатура'},
                {name: 'Мышь'},
                {name: 'Наушники'},
                {name: 'Кулер'},
                {name: 'Водяное охлаждение'},
                {name: 'HDD'},
                {name: 'SDD'},
                {name: 'Системный блок'},
                {name: 'Флешка'},
                {name: 'Акустика'},
                {name: 'Роутер'},
                {name: 'Второй монитор'},
                {name: 'Контроллер'}
            ],
            affordList: []
        };
    },
    mounted () {
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        let vm = this;
        let todoList = document.getElementById('todoList');
        Sortable.create(todoList, {
            group: {
                name: 'list',
                pull: true
            },
            animation: 120,
            ghostClass: 'placeholder-style',
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.doArray.splice(event.newIndex, 0, vm.todoArray[event.item.getAttribute('data-index')]);
            }
        });
        let doList = document.getElementById('doList');
        Sortable.create(doList, {
            group: {
                name: 'list',
                pull: true
            },
            sort: false,
            filter: '.iview-admin-draggable-delete',
            animation: 120,
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.doArray.splice(event.oldIndex, 1);
            }
        });
        let shoppingList = document.getElementById('shoppingList');
        Sortable.create(shoppingList, {
            group: {
                name: 'list',
                pull: true
            },
            animation: 120,
            ghostClass: 'placeholder-style',
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.affordList.splice(event.newIndex, 0, vm.shoppingList[event.item.getAttribute('data-index')]);
            }
        });
        let affordList = document.getElementById('affordList');
        Sortable.create(affordList, {
            group: {
                name: 'list',
                pull: true
            },
            sort: false,
            filter: '.iview-admin-draggable-delete',
            animation: 120,
            fallbackClass: 'iview-admin-cloned-item',
            onRemove (event) {
                vm.affordList.splice(event.oldIndex, 1);
            }
        });
    }
};
</script>
