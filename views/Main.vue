<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'300px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../images/logo.png" key="max-logo" class="max-logo"/>
                    <img v-show="shrink" src="../images/logo-min.png" key="min-logo" class="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'300px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="message-con" @click="ToSite">
                        <Tooltip :content="'Открыть сайт'" placement="bottom">
                            <Icon :size="22" type="share"></Icon>
                        </Tooltip>
                    </div>

                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <!--<lock-screen></lock-screen>-->
                    <message-tip v-model="notificationCount"></message-tip>
                    <theme-switch></theme-switch>


                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ user.name }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">
                                        <Icon type="person"></Icon>
                                        Личная информация
                                    </DropdownItem>
                                    <DropdownItem name="loginout" divided>
                                        <Icon type="log-out"></Icon>
                                        Выйти
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="user.img"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <!--<div class="tags-con">-->
            <!--<tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>-->
            <!--</div>-->
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'300px'}">
            <div class="single-page">
                <!--<keep-alive :include="cachePage">-->
                <router-view></router-view>
                <!--</keep-alive>-->
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    // import shrinkableMenu from 'sidemenu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '../libs/util.js';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            messageTip,
            themeSwitch
        },
        data() {
            return {
                shrink: false,
                user: [],
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                thisSiteUrl: '',
                notificationCount: 0,
            };
        },
        computed: {
            menuList() {
                return this.$store.state.app.menuList;
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // Откройте страницу объекта на странице
            },
            currentPath() {
                return this.$store.state.app.currentPath; // Текущий путь в Breadcrumps
            },
            avatorPath() {
                return localStorage.avatorImgPath;
            },
            cachePage() {
                return this.$store.state.app.cachePage;
            },
            lang() {
                return this.$store.state.app.lang;
            },
            menuTheme() {
                return this.$store.state.app.menuTheme;
            },
        },
        methods: {
            init() {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(this.$route.name);
                this.axios.get('/api/cur_user').then((response) => {
                    this.user = response.data;
                });



                this.axios.get('/api/notifications').then((response) => {
                    let arr = response.data.data;
                    for (  let i = 0; i < arr.length; ++i) {
                        if(arr[i].is_read != true ){
                            this.notificationCount++;
                        }
                        console.log(arr[i].is_read);
                    }
                    console.log(' notificationCount = ' +  this.notificationCount );
                });

            },
            LogOut() {

            },
            ToSite() {
                // window.location.href = ;
                window.open('/');
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    this.axios.get('/api/logout').then((response) => {
                        location.href = '/';
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            checkTag(name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  Решение закрыть текущую вкладку, а затем нажмите на кнопку назад будет вернуться на текущую страницу, Если нет вопрос теге
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange(val) {
                // console.log(val)
            },
            beforePush(name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange(isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route'(to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang() {
                util.setCurrentPath(this, this.$route.name);
            }
        },
        mounted() {
            this.init();
            this.thisSiteUrl = window.location.host;
        },
        created() {

            this.$store.commit('setOpenedList');
        }
    };
</script>
