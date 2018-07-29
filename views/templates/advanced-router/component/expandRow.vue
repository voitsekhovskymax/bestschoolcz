<style lang="less">
    @import '../advanced-router.less';
</style>

<template>
    <div>
        <Row class="advanced-router">
            <Col span="8">
                <span class="expand-key">Карьера：</span>
                <span class="expand-value">{{ row.job }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Интерес：</span>
                <span class="expand-value">{{ row.interest }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">День рождения：</span>
                <span class="expand-value">{{ row.birthday }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">Любимые книги：</span>
                <span class="expand-value">《{{ row.book }}》</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Любимые фильмы：</span>
                <span class="expand-value">{{ row.movie }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Любимая музыка：</span>
                <span class="expand-value">{{ row.music }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>