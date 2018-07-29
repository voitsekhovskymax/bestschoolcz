<style lang="less">
    @import '../../styles/common.less';
    @import './events.less';

</style>
<template>
    <div>
        <Row>
            <Col span="18">
            <Card>
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    Изображение события
                </p>
                <p class="margin-top-10">
                <div class="imgpost">
                    <img id="urlIMG" :src="event.img" alt="" @click="imgPost">
                </div>
                </p>
            </Card>

            <div class="margin-top-10">
                <Card>
                    <Form :label-width="100">
                        <FormItem label="Заголовок события">
                            <Input v-model="event.title" @on-blur="titleBlur" icon="android-list" placeholder="Заголовок должен быть уникальным"
                                   maxlength=256/></Input>
                        </FormItem>
                        <FormItem label="Ссылка статьи">
                            <Input v-model="event.url" maxlength=256>
                            <span slot="prepend">{{ fixedLink }}</span>
                            <span slot="append"><Icon type="link" size="22"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem label="Описание события ">
                            <Input v-model="event.description" type="textarea" :rows="4" placeholder="Краткое описание события (Максимум 256 символов)"
                                   maxlength=256
                                   @on-blur="titleDescription"></Input>
                        </FormItem>
                    </Form>

                    <div class="margin-top-20">
                        <textarea id="articleEventCreate"></textarea>
                    </div>
                </Card>
            </div>


            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        Место события
                    </p>
                        <P>Для добавления маркера, воспользуйтесь поиском, или кликните правой кнопкой мыши по карте</P>
                        <div class="gmap-place-input">
                            <gmap-place-input :select-first-on-enter="true"
                                              @place_changed="updatePlace($event)" placeholder="Поиск мест"></gmap-place-input>
                        </div>
                        <Gmap-Map style="height: 500px;" :center="event.maps.center" @rightclick="mapRclicked"
                                  @zoom_changed="updateZoom('zoom', $event)"
                                  :zoom="event.maps.zoom">
                            <gmap-marker v-if="event.maps.marker != null" :position="event.maps.marker.position">
                            </gmap-marker>
                        </Gmap-Map>

                    
                </Card>
            </div>

            </Col>


            <Col span="6" class="padding-left-10">
            <Card class="collapse_card">
                <p slot="title">
                    <Icon type="ios-pricetags-outline"></Icon>
                    SEO
                </p>
                <Collapse v-model="Collapse_" accordion>
                    <Panel name="1">
                        Ключевые слова
                        <p slot="content">
                            <Input v-model="event.seo_keywords" type="textarea" :rows="4" maxlength=256
                                   placeholder="Перечислите ключевые слова через запятую, максимум 256 символов"></Input>
                        </p>
                    </Panel>
                    <Panel name="2">
                        Заголовок
                        <p slot="content">
                            <Input v-model="event.seo_title" type="textarea" :rows="4" maxlength=256
                                   placeholder="SEO заголовк должен содержать не более 70 символов"></Input>
                        </p>
                    </Panel>
                    <Panel name="3">
                        Описание
                        <p slot="content">
                            <Input v-model="event.seo_description" type="textarea" :rows="4" maxlength=256
                                   placeholder="SEO описание должно содержать не более 256 символов"></Input>
                        </p>
                    </Panel>
                </Collapse>
            </Card>

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        Дата события
                    </p>
                    <Row class="margin-top-20 ">
                        <DatePicker v-model="event.date_event" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss" placeholder="Выберите дату и время"></DatePicker>
                    </Row>
                </Card>
            </div>

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        Категория
                    </p>
                    <Row>
                        <Col span="24">
                        <CheckboxGroup v-model="event.categories">
                            <p v-for="item in categories" :key="item.title">
                                <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                            </p>
                        </CheckboxGroup>
                        </Col>
                        <Col span="24" class="margin-top-10">
                        <Button v-show="!addingNewCategory" @click="handleAddNewCategory" type="ghost" shape="circle"
                                size="small"
                                icon="plus"></Button>
                        </Col>
                    </Row>
                    <transition name="add-new-category">
                        <div v-show="addingNewCategory" class="add-new-tag-con">
                            <Col span="24" class="margin-bottom-10">
                            <Input v-model="category.title" placeholder="Введите название категории"/></Input>
                            </Col>
                            <Col span="24">
                            <ButtonGroup>
                                <Button @click="addCategory" type="primary">
                                    <Icon type="ios-plus-outline"></Icon>
                                    Новая категория
                                </Button>
                                <Button @click="cancelCreateNewCategory" type="ghost">
                                    <Icon type="android-cancel"></Icon>
                                    Отмена
                                </Button>
                            </ButtonGroup>
                            </Col>
                        </div>
                    </transition>
                </Card>
            </div>

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        Куратор события
                    </p>
                    <p class="margin-top-10">
                    <div class="imgpost">
                        <img id="event_author_img" :src="event.event_author_img" alt="" @click="imgAuthor"/>
                    </div>
                    </p>
                    <p class="margin-top-10">
                        <Input v-model="event.event_author_name" icon="android-list"
                               placeholder="Имя куратора"/></Input>
                    </p>
                </Card>
            </div>

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        Публикация
                    </p>
                    <Row class="margin-top-20 ">
                        <span class="publish-button">
                            <Button @click="publish"
                                    :loading="publishLoading"
                                    icon="ios-checkmark"
                                    style=""
                                    type="primary">Опубликовать</Button>
                        </span>
                    </Row>
                </Card>
            </div>
            </Col>
        </Row>
    </div>
</template>


<script>
    import tinymce from 'tinymce';
    import Vue from 'vue';
    import * as VueGoogleMaps from 'vue2-google-maps';

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCqllseCO8TXEejE9m9nbYhbsu4gEjlpEA',
            libraries: 'places',
        }
    });

    export default {
        name: 'event_create',
        data() {
            return {
                event: {
                    title: "",
                    url: "",
                    event_author_name: '',
                    event_author_img: "/images/shop/shop-01.jpg",
                    description: "",
                    content: "",
                    author_id: "",
                    seo_title: "",
                    seo_keywords: "",
                    seo_description: "",
                    img: '/images/blog/blog-large-01.jpg',
                    lang: 'ru',
                    date_event: '',
                    categories: [],
                    maps: {
                        center: {lat: 0, lng: 0},
                        zoom: 12,
                        marker: {
                            enabled: false,
                            position: {
                                lat: null,
                                lng: null
                            },
                        },
                    }
                },
                Collapse_: '1',
                fixedLink: '',
                publishLoading: false,
                categories: [],
                // для добавления новой категории
                addingNewCategory: false,
                category: {},
                //Для карты
              
            };
        },
        mounted() {
            tinymce.init({
                selector: '#articleEventCreate',
                branding: false,
                elementpath: false,
                height: 600,
                language: 'ru',
                menubar: 'edit insert view format table tools',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                    'searchreplace visualblocks visualchars code fullpage',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'paste textcolor colorpicker textpattern imagetools codesample'
                ],
                content_css : '/css/tinymce_fix.css',
                toolbar1: 'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                toolbar2: ' advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc  hr',
                autosave_interval: '20s',
                relative_urls: false,
                content_css : '/css/tinymce_fix.css',
                image_advtab: true,
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
                },
                file_browser_callback: function (field_name, url, type, win) {
                    console.log("file_browser_callback open !");
                    let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
                    let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
                    let cmsURL = '/laravel-filemanager?field_name=' + field_name;
                    if (type == 'image') {
                        cmsURL = cmsURL + "&type=Images";
                    } else {
                        cmsURL = cmsURL + "&type=Files";
                    }
                    tinyMCE.activeEditor.windowManager.open({
                        file: cmsURL,
                        title: 'Filemanager',
                        width: x,
                        height: y,
                        resizable: "yes",
                        close_previous: "no"
                    });
                }
            });
        },
        destroyed() {
            tinymce.get('articleEventCreate').destroy();
        },
        created: function () {
            this.fixedLink = window.location.host + '/event/';
            this.getCategories();
            this.geolocation();
        },
        methods: {
            mapRclicked(mouseArgs) {
                this.event.maps.marker.enabled = true;
                this.event.maps.marker.position.lat = mouseArgs.latLng.lat();
                this.event.maps.marker.position.lng = mouseArgs.latLng.lng();
            },
            updateZoom(field, event) {
                this.event.maps.zoom = event;
            },
            updatePlace(event) {
                console.log(event);
                this.event.maps.marker.enabled = true;
                this.event.maps.center.lat = event.geometry.location.lat();
                this.event.maps.center.lng = event.geometry.location.lng();
                this.event.maps.marker.position.lat = event.geometry.location.lat();
                this.event.maps.marker.position.lng = event.geometry.location.lng();
            },
            geolocation: function () {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.event.maps.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },
            addCategory() {
                this.category.type = 'event';
                this.axios.post('/api/categories', this.category).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже есть категория с таким названием!'
                        });
                    }
                    else {
                        this.publishLoading = false;
                        this.$Notice.success({
                            title: 'Успешно сохранено',
                            desc: 'Добавлена новая категория'
                        });
                        this.addingNewCategory = false;
                        this.category.title = "";
                        
                    }
                    this.getCategories();
                });
            },
            handleAddNewCategory() {
                this.addingNewCategory = !this.addingNewCategory;
            },
            cancelCreateNewCategory() {
                this.addingNewCategory = false;
            },
            getCategories() {
                this.axios.get('/api/get_categories/' + 'event').then((response) => {
                    this.categories = response.data;
                });
            },
            imgPost() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("urlIMG").src = path;

                });
            },
            imgAuthor() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("event_author_img").src = path;

                });
            },
            titleBlur() {
                if (this.event.title.length !== 0) {
                    this.event.url = this.translit(this.event.title);
                    this.event.seo_title = this.event.title;
                } else {
                    this.$Message.error('Заголовок статьи не может быть пустым');
                }
            },
            titleDescription() {
                if (this.event.description.length !== 0) {
                    this.event.seo_description = this.event.description;
                } else {
                    this.$Message.error('Описание статьи не может быть пустым!');
                }
            },
            canPublish() {
                if (this.event.title.length === 0) {
                    this.$Message.error('Введите название статьи');
                    return false;
                } else {
                    return true;
                }
            },
            publish() {
                if (this.canPublish()) {
                    this.event.img = document.getElementById("urlIMG").src;
                    this.event.event_author_img = document.getElementById("event_author_img").src;
                    this.event.content = tinymce.get('articleEventCreate').getContent();
                    this.publishLoading = true;
                    console.log(this.event);
                    this.axios.post('/api/events', this.event).then((response) => {
                        console.log(response.data);
                        if (response.data == 0) {
                            this.publishLoading = false;
                            this.$Notice.warning({
                                title: 'Внимание!',
                                desc: 'Уже есть событие с таким названием!'
                            });
                        }
                        else {
                            this.publishLoading = false;
                            this.$Notice.success({
                                title: 'Успешно сохранено',
                                desc: 'Событие успешно сохранено'
                            });
                            this.$router.push({
                                name: 'events'
                            });
                        }
                    });
                }
            },
            handleEditOpenness() {
                this.editOpenness = !this.editOpenness;
            },
            handleSaveOpenness() {
                this.Openness = this.currentOpenness;
                this.editOpenness = false;
            },
            cancelEditOpenness() {
                this.currentOpenness = this.Openness;
                this.editOpenness = false;
            },
            translit(url) {
// Символ, на который будут заменяться все спецсимволы
                var space = '-';
// Берем значение из нужного поля и переводим в нижний регистр
                var text = url.toLowerCase();

// Массив для транслитерации
                var transl = {
                    'а': 'a',
                    'б': 'b',
                    'в': 'v',
                    'г': 'g',
                    'д': 'd',
                    'е': 'e',
                    'ё': 'e',
                    'ж': 'zh',
                    'з': 'z',
                    'и': 'i',
                    'й': 'j',
                    'к': 'k',
                    'л': 'l',
                    'м': 'm',
                    'н': 'n',
                    'о': 'o',
                    'п': 'p',
                    'р': 'r',
                    'с': 's',
                    'т': 't',
                    'у': 'u',
                    'ф': 'f',
                    'х': 'h',
                    'ц': 'c',
                    'ч': 'ch',
                    'ш': 'sh',
                    'щ': 'sh',
                    'ъ': space,
                    'ы': 'y',
                    'ь': space,
                    'э': 'e',
                    'ю': 'yu',
                    'я': 'ya',
                    ' ': space,
                    '_': space,
                    '`': space,
                    '~': space,
                    '!': space,
                    '@': space,
                    '#': space,
                    '$': space,
                    '%': space,
                    '^': space,
                    '&': space,
                    '*': space,
                    '(': space,
                    ')': space,
                    '-': space,
                    '\=': space,
                    '+': space,
                    '[': space,
                    ']': space,
                    '\\': space,
                    '|': space,
                    '/': space,
                    '.': space,
                    ',': space,
                    '{': space,
                    '}': space,
                    '\'': space,
                    '"': space,
                    ';': space,
                    ':': space,
                    '?': space,
                    '<': space,
                    '>': space,
                    '№': space
                }

                var result = '';
                var curent_sim = '';

                for (var i = 0; i < text.length; i++) {
                    // Если символ найден в массиве то меняем его
                    if (transl[text[i]] != undefined) {
                        if (curent_sim != transl[text[i]] || curent_sim != space) {
                            result += transl[text[i]];
                            curent_sim = transl[text[i]];
                        }
                    }
                    // Если нет, то оставляем так как есть
                    else {
                        result += text[i];
                        curent_sim = text[i];
                    }
                }
                result = this.trim(result);
                return result;
            },
            trim(s) {
                s = s.replace(/^-/, '');
                return s.replace(/-$/, '');
            }
        }
    };
</script>