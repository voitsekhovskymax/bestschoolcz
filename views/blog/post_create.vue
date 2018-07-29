<style lang="less">
    @import '../../styles/common.less';
    @import './post_create.less';
    
</style>

<template>
    <div>
        <Row>
            <Col span="18">
            <Card>
                <p slot="title">
                    <Icon type="paper-airplane"></Icon>
                    Изображение
                </p>
                <p class="margin-top-10">
                <div class="imgpost">
                    <img id="urlIMG" :src="post.img" alt="" @click="imgPost"/>
                </div>
                </p>
            </Card>
            <div class="margin-top-10">
                <Card>
                    <Form :label-width="100">
                        <FormItem label="Заголовок статьи">
                            <Input v-model="post.title" @on-blur="titleBlur" icon="android-list" maxlength=256 placeholder="Заголовок статьи должен быть уникален"/></Input>
                        </FormItem>
                        <FormItem label="Ссылка статьи">
                            <Input v-model="post.url" maxlength=256 >
                            <span slot="prepend">{{ fixedLink }}</span>
                            <span slot="append"><Icon type="link" size="22" ></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem label="Описание статьи ">
                            <Input v-model="post.description" type="textarea" :rows="4" maxlength=256
                                   placeholder="Описание статьи (максимум 256 символов)"
                                   @on-change="titleDescription" ></Input>
                        </FormItem>
                    </Form>
                    <div class="margin-top-20">
                        <textarea id="articlePostCreate"></textarea>
                    </div>
                </Card>
            </div>
            </Col>
            <Col span="6" class="padding-left-10">
            <Card>
                <p slot="title">
                    <Icon type="navicon-round"></Icon>
                    Категория
                </p>
                <Row>
                    <Col span="24">
                    <CheckboxGroup v-model="post.categories">
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

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="ios-pricetags-outline"></Icon>
                        Теги
                    </p>
                    <Row>
                        <Col span="24">
                        <CheckboxGroup v-model="post.tags">
                            <p v-for="item in tags" :key="item.title">
                                <Checkbox :label="item.title">{{ item.title }}</Checkbox>
                            </p>
                        </CheckboxGroup>
                        </Col>
                        <Col span="24" class="margin-top-10">
                        <Button v-show="!addingNewTag" @click="handleAddNewTag" type="ghost" shape="circle" size="small"
                                icon="plus"></Button>
                        </Col>
                    </Row>
                    <transition name="add-new-tag ">
                        <div v-show="addingNewTag" class="add-new-tag-con">
                            <Col span="24" class="margin-bottom-10">
                            <Input v-model="tag.title" placeholder="Введите название тега"/></Input>
                            </Col>
                            <Col span="24">
                            <ButtonGroup>
                                <Button @click="addTag" type="primary">
                                    <Icon type="ios-plus-outline"></Icon>
                                    Новый тег
                                </Button>
                                <Button @click="cancelCreateNewTag" type="ghost">
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
                <Card class="collapse_card">
                    <p slot="title">
                        <Icon type="ios-pricetags-outline"></Icon>
                        SEO
                    </p>
                    <Collapse v-model="Collapse_" accordion>
                        <Panel name="1">
                            Ключевые слова
                            <p slot="content">
                                <Input v-model="post.seo_keywords" type="textarea" :rows="4"
                                       placeholder="SEO ключевые слова статьи" maxlength=256 ></Input>
                            </p>
                        </Panel>
                        <Panel name="2">
                            Заголовок
                            <p slot="content">
                                <Input v-model="post.seo_title" type="textarea" :rows="4"
                                       placeholder="SEO название статьи" maxlength=256 ></Input>
                            </p>
                        </Panel>
                        <Panel name="3">
                            Описание
                            <p slot="content">
                                <Input v-model="post.seo_description" type="textarea" :rows="4"
                                       placeholder="SEO описание статьи" maxlength=256 ></Input>
                            </p>
                        </Panel>
                    </Collapse>
                </Card>
            </div>
            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        Публикация
                    </p>
                    <p class="margin-top-10">
                        <Icon type="android-time"></Icon>&nbsp;Статус публикации
                        <Select size="small"  v-model="post.post_status">
                            <Option v-for="item in articleStateList" :value="item.value" :key="item.text">{{ item.text}}
                            </Option>
                        </Select>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="eye"></Icon>
                        Доступ：&nbsp;<b>{{ Openness }}</b>
                        <Button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="ghost">
                            Редактировать
                        </Button>
                        <transition name="openness-con">
                            <div v-show="editOpenness" class="openness-radio-con">
                                <RadioGroup v-model="currentOpenness" vertical>
                                    <Radio label="Открыт">
                                        Открыт
                                    </Radio>
                                    <Radio label="Пароль">
                                        Пароль
                                        <Input v-show="currentOpenness === 'Пароль'" v-model="post.password"
                                               size="small"
                                               placeholder=" * * * * "/></Input>
                                    </Radio>
                                    <Radio label="Только зарегистрированным пользователям"
                                           v-model="post.password === 'register'"></Radio>
                                </RadioGroup>
                                <div>
                                    <Button type="primary" @click="handleSaveOpenness">Подтвердить</Button>
                                    <Button type="ghost" @click="cancelEditOpenness">Отменить</Button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="ios-calendar-outline"></Icon>
                        Время публикации
                        <DatePicker v-model="post.published_at" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss" placeholder="Выберите дату и время"></DatePicker>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="android-time"></Icon>&nbsp;Автор статьи
                        <Select size="small" value="user.name" v-model="post.author_id">
                            <Option v-for="item in users" :value="item.id" :key="item.name">{{ item.name}}
                            </Option>
                        </Select>
                    </p>
                    <Row class="margin-top-20 publish-button-con">
                        <span class="publish-button"><Button @click="publish" :loading="publishLoading"
                                                             icon="ios-checkmark" style=""
                                                             type="primary">Опубликовать</Button></span>
                    </Row>
                </Card>
            </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import tinymce from 'tinymce';

    export default {
        name: 'new-post',
        data() {
            return {
                post: {
                    title: "",
                    url: "",
                    description: "",
                    content: "",
                    author_id: "",
                    categories: [],
                    tags: [],
                    password: "",
                    post_status: "published",
                    published_at: "",
                    seo_title: "",
                    seo_keywords: "",
                    seo_description: "",
                    img: '/images/blog/blog-large-01.jpg',
                        lang: 'ru'
                },
                showLink: false,
                fixedLink: '',
                articleStateListActive:{
                    value: 'published',
                    text: 'Опубликовать'
                },
                articleStateList: [
                    {
                        value: 'published',
                        text: 'Опубликовать'
                    },
                    {
                        value: 'draft',
                        text: 'Сохранить черновик'
                    }
                ],
                Collapse_: '1',
                editOpenness: false,
                Openness: 'Открыт',
                currentOpenness: 'Открыт',
                tags: [],
                categories: [],
                publishLoading: false,
                // для добавления нового тега
                tag: {},
                addingNewTag: false,
                // для добавления новой категории
                addingNewCategory: false,
                category: {},
                // выбор автора статьи
                users: [],

                user: [],
            };
        },
        mounted() {
            tinymce.init({
                selector: '#articlePostCreate',
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
            tinymce.get('articlePostCreate').destroy();
        },
        created: function () {
            this.fixedLink = window.location.host + '/post/';
            this.getTags();
            this.getCategories();
            this.getUsers();
            this.getUser();
        },
        methods: {
            getUsers() {
                this.axios.get('/api/all_users').then((response) => {
                    this.users = response.data;
                });
            },
            getUser() {
                this.axios.get('/api/cur_user').then((response) => {
                    this.user = response.data;
                    this.post.author_id = this.user.id;
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
            getTags() {
                this.axios.get('/api/post_tags').then((response) => {
                    this.tags = response.data;
                });
            },
            addTag() {
                this.tag.type = 'post';
                this.axios.post('/api/tags', this.tag).then((response) => {
                    console.log(response.data);
                    if (response.data == 0) {
                        this.$Notice.warning({
                            title: 'Внимание!',
                            desc: 'Уже есть тег с таким названием!'
                        });
                    }
                    else {
                        this.$Notice.success({
                            title: 'Успешно',
                            desc: 'Добавлен новый тег'
                        });
                        this.addingNewTag = false;
                        this.tag.title = "";
                    }
                    this.getTags();
                });
            },
            addCategory() {
                this.category.type = 'post';
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
            getCategories() {
                this.axios.get('/api/get_categories/' + 'post').then((response) => {
                    this.categories = response.data;
                });
            },
            titleBlur() {
                if (this.post.title.length !== 0) {
                    this.post.url = this.translit(this.post.title);
                    this.post.seo_title = this.post.title;

                } else {
                    this.$Message.error('Заголовок статьи не может быть пустым');
                }
            },
            titleDescription() {
                if (this.post.description.length !== 0) {
                    this.post.seo_description = this.post.description;
                } else {
                    this.$Message.error('Описание статьи не может быть пустым!');
                }
            },
            cancelCreateNewTag() {
                this.addingNewTag = false;
            },
            handleAddNewTag() {
                this.addingNewTag = !this.addingNewTag;
            },
            handleAddNewCategory() {
                this.addingNewCategory = !this.addingNewCategory;
            },
            cancelCreateNewCategory() {
                this.addingNewCategory = false;
            },
            canPublish() {
                if (this.post.title.length === 0) {
                    this.$Message.error('Введите название статьи');
                    return false;
                } else {
                    return true;
                }
            },
            publish() {
                if (this.canPublish()) {
                    console.log('posted..');
                    this.post.img = document.getElementById("urlIMG").src;
                    this.post.content = tinymce.get('articlePostCreate').getContent();
                    this.publishLoading = true;
                    console.log(this.post);
                    this.axios.post('/api/posts', this.post).then((response) => {
                        console.log(response.data);
                        if (response.data == 0) {
                            this.publishLoading = false;
                            this.$Notice.warning({
                                title: 'Внимание!',
                                desc: 'Уже есть статья с таким названием!'
                            });
                        }
                        else {
                            this.publishLoading = false;
                            this.$Notice.success({
                                title: 'Успешно сохранено',
                                desc: 'Статья успешно сохранена'
                            });
                            this.$router.push({
                                name: 'posts'
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
