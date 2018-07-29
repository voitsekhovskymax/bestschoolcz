<style lang="less">
    @import '../../styles/common.less';
    @import './courses.less';
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
                    <img id="urlIMG" :src="course.img" alt="" @click="imgPost">
                </div>
                </p>
            </Card>
            <div class="margin-top-10">
                <Card>
                    <Form :label-width="100">
                        <FormItem label="Название курса">
                            <Input v-model="course.title" @on-blur="titleBlur" icon="android-list" maxlength=256 /></Input>
                        </FormItem>
                        <FormItem label="Ссылка статьи">
                            <Input v-model="course.url" maxlength=256>
                            <span slot="prepend">{{ fixedLink }}</span>
                            <span slot="append"><Icon type="link" size="22"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem label="Описание курса">
                            <Input v-model="course.description" type="textarea" maxlength=256 :rows="4" placeholder="Описание курса"
                                   @on-blur="titleDescription"></Input>
                        </FormItem>
                    </Form>
                    <div class="margin-top-20">
                        <textarea id="articleCourseCreate"></textarea>
                    </div>
                </Card>
            </div>
            </Col>
            <Col span="6" class="padding-left-10">
            <Card>
                <p slot="title">
                    <Icon type="ios-pricetags-outline"></Icon>
                    Информация курса
                </p>
                <div class="margin-top-10">
                    <p>
                        <Icon type="ios-calendar-outline"></Icon>
                        Тип курса
                    </p>
                    <RadioGroup v-model="course.type_course" vertical>
                        <Radio label="semester">
                            Семестровый
                        </Radio>
                        <Radio label="year">
                            Годовой
                        </Radio>
                    </RadioGroup>
                </div>

                <div v-if="course.type_course == 'semester'" class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>
                    Даты начала и завершения семестра
                </div>
                <div v-if="course.type_course == 'year'" class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>
                    Даты первого семестра
                </div>
                <div class="margin-top-10">
                    <DatePicker v-model="course.first_semester"
                                size="small"
                                type="daterange"
                                placement="bottom-end"
                                format="yyyy-MM-dd"
                                placeholder="Выберите даты"
                                icon="ios-clock-outline">
                    </DatePicker>
                </div>
                <div v-if="course.type_course == 'year'" class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>
                    Даты второго семестра
                    <div class="margin-top-10">
                        <DatePicker v-if="course.type_course == 'year'"
                                    size="small"
                                    v-model="course.last_semester"
                                    type="daterange"
                                    format="yyyy-MM-dd"
                                    placement="bottom-end"
                                    placeholder="Выберите даты"
                                    icon="ios-clock-outline"></DatePicker>
                    </div>
                </div>

                <div class="margin-top-10">
                    <Tooltip placement="left" content="Последняя дата когда можно подать документы" :delay="500">
                        <Icon type="ios-calendar-outline"></Icon>
                        Срок подачи документов
                    </Tooltip>
                    <div class="margin-top-10">
                        <DatePicker v-model="course.deadline"
                                    size="small"
                                    type="daterange"
                                    format="yyyy-MM-dd"
                                    placement="bottom-end"
                                    placeholder="Выберите дату"></DatePicker>
                    </div>

                </div>
                <div class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>
                    Стоимость курса

                    <div class="margin-top-10">
                        <InputNumber :min="0" size="small" v-model="course.price"
                                     icon="ios-clock-outline"></InputNumber>
                    </div>
                </div>

                <div class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>
                    Количество часов
                </div>
                <div class="margin-top-10">
                    <InputNumber :min="0" size="small" v-model="course.hours"
                                 icon="ios-clock-outline"></InputNumber>
                </div>

                <div class="margin-top-10">
                    <Icon type="ios-calendar-outline"></Icon>
                    Уровень курса

                <div class="margin-top-10">
                    <Select v-model="course.level_language" size="small" placeholder="Уровень курса">
                        <Option v-for="item in level_languages" :value="item.name" :key="item.name">
                            <div> {{ item.name }}</div>
                            <div style="color:#ccc"> {{ item.text }}</div>
                        </Option>
                    </Select>
                </div>
                </div>
                
                <div class="margin-top-10">

                    <Icon type="ios-calendar-outline"></Icon>
                    Количество студентов в группе

                <div class="margin-top-10">
                    <InputNumber :min="0" v-model="course.student_number"
                                 icon="ios-clock-outline"></InputNumber>
                </div>
                </div>
            </Card>

            <div class="margin-top-10">
                <Card>
                    <p slot="title">
                        <Icon type="navicon-round"></Icon>
                        Категория
                    </p>
                    <Row>
                        <Col span="24">
                        <CheckboxGroup v-model="course.categories">
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
                <Card class="collapse_card">
                    <p slot="title">
                        <Icon type="ios-pricetags-outline"></Icon>
                        SEO
                    </p>
                    <Collapse v-model="Collapse_" accordion>
                        <Panel name="1">
                            Ключевые слова
                            <p slot="content">
                                <Input v-model="course.seo_keywords" type="textarea" :rows="4" maxlength=256
                                       placeholder="Ключевые слова"></Input>
                            </p>
                        </Panel>
                        <Panel name="2">
                            Заголовок
                            <p slot="content">
                                <Input v-model="course.seo_title" type="textarea" :rows="4" maxlength=256
                                       placeholder="Название курса"></Input>
                            </p>
                        </Panel>
                        <Panel name="3">
                            Описание
                            <p slot="content">
                                <Input v-model="course.seo_description" type="textarea" :rows="4" maxlength=256
                                       placeholder="Описание курса"></Input>
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
                        <Checkbox v-model="course.is_index_page">Вывести на главной</Checkbox>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="android-time"></Icon>&nbsp;Статус
                        <Select size="small"  v-model="course.course_status">
                            <Option v-for="item in articleStateList" :value="item.value" :key="item.text">{{ item.text}}
                            </Option>
                        </Select>
                    </p>
                    <p class="margin-top-10">
                        <Icon type="ios-calendar-outline"></Icon>
                        Время публикации
                        <DatePicker v-model="course.published_at" type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss" placeholder="Выберите дату и время"></DatePicker>
                    </p>
                    <Row class="margin-top-20 publish-button-con">
                        <!--<span class="publish-button"><Button @click="handlePreview">предварительный просмотр</Button></span>-->
                        <!--<span class="publish-button"><Button @click="handleSaveDraft">Сохранить черновик</Button></span>-->
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
        name: 'new-course',
        data() {
            return {
                course: {
                    // заголовок курса
                    title: "",

                    // адресс курса
                    url: "",

                    // описание курса
                    description: "",

                    // контент курса
                    content: "",

                    // [черновик / опубликовано]
                    course_status: "published",

                    // Публикация курса
                    published_at: "",

                    // СЕО заголовок
                    seo_title: "",

                    // СЕО ключевые слова
                    seo_keywords: "",

                    // СЕО описание
                    seo_description: "",

                    //Изображение курса
                    img: '/images/blog/blog-large-01.jpg',

                    // 
                    lang: 'ru',

                    // тип курса, семестровый | Годовой. Если выбран семестровый тип,  поле last_semester будет пустым.
                    //  [semester || year]
                    type_course: 'semester',

                    //  всегда прилетят даты начала и конца 
                    // [2018-01-05T22:00:00.000Z, ]
                    first_semester: [],

                    // будет пустым если курс семестровый
                    // [2018-01-05T22:00:00.000Z]
                    last_semester: [],

                    // Цена курса
                    // 700
                    price: 0,

                    // количество часов в курсе
                    // 1280
                    hours: 0,

                    // сроки подачи документов
                    // [2018-01-05T22:00:00.000Z]
                    deadline: [],

                    //Массив категорий курса  
                    categories: [],
                    
                    // уровень языка после прохождения курса
                    // B1
                    level_language: '',

                    // Количество студентов в группе
                    student_number: 0,

                    //Вывести курс на главной
                    is_index_page:false
                },
                level_languages: [
                    {name: 'A1', text: "Уровень выживания"},
                    {name: 'A2', text: "Предпороговый уровень"},
                    {name: 'B1', text: "Пороговый уровень"},
                    {name: 'B2', text: "Продвинутый уровень"},
                    {name: 'C1', text: "Профессиональный уровень"},
                    {name: 'C2', text: "Совершенный уровень"},

                ],
                Collapse_: '1',
                showLink: false,
                fixedLink: '',
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
                publishLoading: false,
                users: [],
                user: [],
                categories: [],
                addingNewCategory: false,
                category: {},
            };
        },
        mounted() {
            tinymce.init({
                selector: '#articleCourseCreate',
                branding: false,
                elementpath: false,
                height: 600,
                language: 'ru',
                menubar: 'edit insert view format table tools',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr'
                ],
                toolbar1: 'formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                toolbar2: ' advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc help  hr',
                autosave_interval: '20s',
                image_advtab: true,
                relative_urls: false,
                content_css : '/css/tinymce_fix.css',
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
            tinymce.get('articleCourseCreate').destroy();
        },
        created: function () {
            this.fixedLink = window.location.host + '/courses/';
            this.getCategories();
        },
        methods: {
            addCategory() {
                this.category.type = 'course';
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
                this.axios.get('/api/get_categories/' + 'course').then((response) => {
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
            titleBlur() {
                if (this.course.title.length !== 0) {
                    this.course.url = this.translit(this.course.title);
                    this.course.seo_title = this.course.title;

                } else {
                    this.$Message.error('Заголовок курса не может быть пустым');
                }
            },
            titleDescription() {
                if (this.course.description.length !== 0) {
                    this.course.seo_description = this.course.description;
                } else {
                    this.$Message.error('Описание курса не может быть пустым!');
                }
            },
            canPublish() {
                if (this.course.title.length === 0) {
                    this.$Message.error('Введите название статьи');
                    return false;
                } else {
                    return true;
                }
            },
            publish() {
                if (this.canPublish()) {
                    this.course.img = document.getElementById("urlIMG").src;
                    this.course.content = tinymce.get('articleCourseCreate').getContent();
                    this.publishLoading = true;
                    console.log(this.course);
                    this.axios.post('/api/courses', this.course).then((response) => {
                        console.log(response.data);
                        if (response.data == 0) {
                            this.publishLoading = false;
                            this.$Notice.warning({
                                title: 'Внимание!',
                                desc: 'Уже есть курс с таким названием!'
                            });
                        }
                        else {
                            this.publishLoading = false;
                            this.$Notice.success({
                                title: 'Успешно сохранено',
                                desc: 'Курс успешно сохранен'
                            });
                            this.$router.push({
                                name: 'courses'
                            });
                        }
                    });
                }
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
                };
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
