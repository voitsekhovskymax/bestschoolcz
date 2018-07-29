<style lang="less">
    @import "./gallery.less";
    @import "../../styles/common.less";
</style>
<template>
    <div >
        <Row>
            <Col span="24">
            <Alert type="success">Выберите тип галереи</Alert>

            <Card style="width: 300px; margin-top: 10px;">
                <p slot="title">Фотогалерея</p>
                <Icon type="ios-camera-outline"></Icon>
            </Card>

            <Card  style="width: 300px; margin-left: 10px; margin-top: 10px;">
                <p slot="title">Видеогелерея</p>
                <Icon type="ios-videocam-outline"></Icon>
            </Card>
            </Col>
        </Row>s
    </div>
</template>

<script>
    export default {
        name: 'new_gallery',
        data() {
            return {
             
            }
        },
      
    }
</script>