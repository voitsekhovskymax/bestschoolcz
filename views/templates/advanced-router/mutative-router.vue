<style lang="less">
    @import './advanced-router.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        Детали заказа(динамическая маршрутизация)
                    </p>
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table :columns="orderColumns" :data="orderData" style="width: 100%;"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'mutative-router',
    data () {
        return {
            orderColumns: [
                {
                    type: 'index',
                    title: 'Продажи',
                    width: 60
                },
                {
                    title: 'Число заказов',
                    key: 'order_id',
                    align: 'center'
                },
                {
                    title: 'Имя пользователя',
                    key: 'user_name'
                },
                {
                    title: 'Больше',
                    key: 'show_more',
                    align: 'center',
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    let argu = { order_id: params.row.order_id };
                                    this.$router.push({
                                        name: 'order-info',
                                        params: argu
                                    });
                                }
                            }
                        }, 'Подробнее');
                    }
                }
            ],
            orderData: [
                {
                    order_id: '1000001',
                    user_name: 'Aresn'
                },
                {
                    order_id: '1000002',
                    user_name: 'Lison'
                },
                {
                    order_id: '1000003',
                    user_name: 'lili'
                },
                {
                    order_id: '1000004',
                    user_name: 'lala'
                }
            ]
        };
    },
    computed: {
        avatorImage () {
            return localStorage.avatorImgPath;
        }
    }
};
</script>
