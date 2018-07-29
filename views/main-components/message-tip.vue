<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="value > 0 ? 'Новые уведомления: ' + value  : 'Нет уведомлений'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
import util from '../../libs/util.js';
export default {
    name: 'messageTip',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    methods: {
        showMessage () {
            this.$router.push({
                name: 'notifications'
            });
        }
    }
};
</script>
