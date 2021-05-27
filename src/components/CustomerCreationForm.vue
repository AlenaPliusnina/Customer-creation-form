<template>
    <div class="form-wrapper">
        <form class="form" @submit.prevent="submitForm">
            <h2>Форма создания клиента</h2>
            
            <div class="block">
                <div class="group-1">
                    <label for="lname">Фамилия *</label> 
                    <input type="text" id="lname" v-model="form.lname" @blur="$v.form.lname.$touch()">
                    <span class="bar"></span>

                    <span class="error" v-if="$v.form.lname.$error">
                        <template v-if="!$v.form.lname.alpha">
                            Фамилия должна состоять из букв кирилицы 
                        </template>
                        <template v-else>
                            Фамилия обязательна для заполнения
                        </template>
                    </span>
                </div>

                <div class="group-1">
                    <label for="fname">Имя *</label>      
                    <input type="text" id="fname" v-model="form.fname" @blur="$v.form.fname.$touch()">
                    <span class="bar"></span>

                    <span class="error"  v-if="$v.form.fname.$error">
                        <template v-if="!$v.form.fname.alpha">
                            Имя должно состоять из букв кирилицы 
                        </template>
                        <template v-else>
                            Имя обязательно для заполнения
                        </template>
                    </span>
                </div>

                <div class="group-1">      
                    <label for="patronymic">Отчество</label>
                    <input type="text" id="patronymic" v-model="form.patronymic" @blur="$v.form.patronymic.$touch()">
                    <span class="bar"></span>

                    <span class="error"  v-if="$v.form.patronymic.$error">
                        <template v-if="!$v.form.patronymic.alpha">
                            Отчество должно состоять из букв кирилицы 
                        </template>
                    </span>
                </div>
            </div>

            <div class="block">
                <label>Дата рождения *</label>
                <div class="group-2">      
                    <input type="date" v-model="form.date_of_birth" @blur="$v.form.date_of_birth.$touch()">

                    <span class="error" v-if="$v.form.date_of_birth.$error">
                        <template v-if="!$v.form.date_of_birth.dateBirthValid">
                            Дата рождения не может быть в будущем
                        </template>
                        <template v-else>
                            Дата рождения обязательна для заполнения
                        </template>
                    </span>
                </div>

                <label for="phone">Номер телефона *</label>
                <div class="group-2">      
                    <input type="tel" id="phone" name="phone" placeholder="7 (xxx) xxx xx xx"
                    v-model="form.phone" @input="formatPhone" @blur="$v.form.phone.$touch()">

                    <span class="error" v-if="$v.form.phone.$error">
                        <template v-if="!$v.form.phone.required">
                            Номер телефона обязателен для заполнения
                        </template>
                        <template v-else-if="!$v.form.phone.phoneValid">
                            Номер телефона должен состоять из 11 цифр (0-9) и начинаться с 7
                        </template>
                    </span>
                </div>

                <label>Пол</label>   
                <div class="group-3">  
                    <input type="radio" name="sex" id="fsex" v-model="form.sex">
                    <label for="fsex">Женский</label>
                    <input type="radio" name="sex" id="msex" v-model="form.sex">
                    <label for="msex">Мужской</label>
                </div>
            </div>

            <div class="block">
                <label for="multi-select-1">Группа клиентов *</label>
                <div id="multi-select-1">
                    <div class="multi-select-box select-box" v-on:click="showCheckboxes()">
                        <select>
                            <option v-if="form.client_group.length === 0">Выберете опцию...</option>
                            <option v-else id="options" ref="options">{{ form.client_group.join(' | ') }}</option>
                        </select>
                        <div class="over-select"></div>
                    </div>
                    <div id="checkboxes" ref="checkboxes" v-on:mouseleave="hideCheckbowes()">
                        <label for="VIP">
                        <input type="checkbox" id="VIP" value="VIP" v-model="form.client_group" v-model.lazy="$v.form.client_group.$model"/>VIP</label>
                        <label for="problematic">
                        <input type="checkbox" id="problematic" value="Проблемные" v-model="form.client_group" v-model.lazy="$v.form.client_group.$model"/>Проблемные</label>
                        <label for="OMS">
                        <input type="checkbox" id="OMS" value="ОМС" v-model="form.client_group" v-model.lazy="$v.form.client_group.$model"/>OMS</label>
                    </div>
                </div> 
                <span class="error" v-if="$v.form.client_group.$error">
                    <template v-if="!$v.form.client_group.required">
                        Выбор группы клиентов обязателен
                    </template>
                </span><br><br>

                <label for="select-box-1"><span>Лечащий врач</span></label>
                <div class="select-box">
                    <select id="select-box-1" v-model="form.doctor">
                        <option value="" selected>Выберете врача...</option>
                        <option value="Ivanov">Иванов</option>
                        <option value="Zaharov">Захаров</option>
                        <option value="Chernysheva">Чернышева</option>
                    </select>
                </div>

                <div class="checkbox-sms">
                    <label for="SMS">Не отправлять СМС</label>
                    <input type="checkbox" id="SMS" v-model="form.sms">
                </div>
            </div>
           

            <div class="block">
                <h3>Адрес</h3>
                <hr class="separator">

                <label for="index">Индекс</label>
                <div class="index small-input">
                    <input type="text" id="index" maxlength="6" placeholder="xxxxxx" v-model="form.index" @blur="$v.form.index.$touch()">
                    <span class="error" v-if="$v.form.index.$error">
                    <template v-if="!$v.form.index.numeric">
                        Индекс должен состоять из цифр 0-9
                    </template>
                    <template v-else-if="!$v.form.index.minLength">
                        Индекс должен состоять из шести цифр
                    </template>
                    <template v-else>
                        Индекс должен состоять из шести цифр
                    </template><br>
                </span>
                </div>

                <label for="select-country">Страна</label>
                <div class="select-box">
                    <CountrySelector/>  
                </div>

                <div class="group-1">      
                    <label for="area">Область</label>
                    <input type="text" id="area" v-model="form.area" @blur="$v.form.area.$touch()">
                    <span class="bar"></span>

                    <span class="error" v-if="$v.form.area.$error">
                        <template v-if="!$v.form.area.alpha">
                            Название области должно состоять из букв кирилицы 
                        </template>
                    </span>
                </div>

                <div class="group-1">      
                    <label for="city">Город *</label>
                    <input type="text" id="city" v-model="form.city" @blur="$v.form.city.$touch()">
                    <span class="bar"></span>

                    <span class="error"  v-if="$v.form.city.$error">
                        <template v-if="!$v.form.city.cityNameValid">
                            Название города может состоять из букв кирилицы/знака "-"
                        </template>
                        <template v-else>
                            Название города обязательно для заполнения
                        </template>
                    </span>
                </div>

                <div class="group-1">      
                    <label for="street">Улица</label>
                    <input type="text" id="street" v-model="form.street" @blur="$v.form.street.$touch()">
                    <span class="bar"></span>

                    <span class="error"  v-if="$v.form.street.$error">
                        <template v-if="!$v.form.street.streetNameValid">
                            Название улицы может состоять из букв кирилицы/знака "-"
                        </template>
                    </span>
                </div>

                <div class="house">
                    <label>Дом</label>
                    <input type="text" v-model="form.house" v-model.lazy="$v.form.house.$model">
                </div>

                <span class="error" v-if="$v.form.house.$error">
                    <template v-if="!$v.form.house.houseNumberValid">
                        Номер дома должен быть в формате: 78, 8, 99a, 82/4 
                        (где буквы могут быть латницей или кирилицей)
                    </template>
                </span>
            </div>
            
            <div class="block">
                <h3>Документ</h3>
                <hr class="separator">
                
                <label for="select-box-2"><span>Тип документа *</span></label>
                <div class="select-box">
                    <select id="select-box-2" v-model="form.document" @blur="$v.form.document.$touch()">
                        <option value="" selected>Выберете тип документа...</option>
                        <option value="passport">Паспорт</option>
                        <option value="birth certificate">Свидетельство о рождении</option>
                        <option value="driver's license">Вод. удостоверение</option>
                    </select>
                </div>
                <span class="error" v-if="$v.form.document.$error">
                    <template>
                        Выбор документа обязателен
                    </template>
                </span>

                <div class="series-number">
                    <label for="series">Cерия</label>
                    <div class="group-2 series small-input">
                        <input type="text" id="series" placeholder="xxxx" maxlength="4" v-model="form.series" @blur="$v.form.series.$touch()">

                        <span class="error" v-if="$v.form.series.$error">
                            <template v-if="!$v.form.series.numeric">
                                Серия должна состоять из цифр 0-9
                            </template>
                            <template v-else-if="!$v.form.series.minLength">
                                Серия должна состоять из четырех цифр
                            </template>
                        </span>
                    </div>

                    <label for="number">Номер</label>
                    <div class="group-2 number small-input">
                        <input type="text" id="series" placeholder="xxxxxx" maxlength="6" v-model="form.number" @blur="$v.form.number.$touch()">

                        <span class="error" v-if="$v.form.number.$error">
                            <template v-if="!$v.form.number.numeric">
                                Номер должен состоять из цифр 0-9
                            </template>
                            <template v-else-if="!$v.form.number.minLength">
                                Номер должен состоять из шести цифр
                            </template>
                        </span>
                    </div>
                </div>

                <div class="group-1 issued_by">      
                    <label for="issued_by">Кем выдан</label>
                    <input type="text" id="issued_by" v-model="form.issued_by" @blur="$v.form.issued_by.$touch()">
                    <span class="bar"></span>

                    <span class="error" v-if="$v.form.issued_by.$error">
                        <template v-if="!$v.form.issued_by.alpha">
                            Поле - "Кем выдан" должно состоять из букв кирилицы 
                        </template>
                    </span>
                </div>

                <div class="date-of-issue">
                    <label>Дата выдачи *</label>
                    <div class="group-2">      
                        <input type="date" v-model="form.date_of_issue" @blur="$v.form.date_of_issue.$touch()">

                        <span class="error" v-if="$v.form.date_of_issue.$error">
                            <template  v-if="!$v.form.date_of_issue.dateIssueValid">
                                Дата выдачи паспорта не может быть в будущем
                            </template>
                            <template v-else>
                                Дата выдачи обязательна для заполнения
                            </template>
                        </span>
                    </div>   
                </div>             
            </div>

            <span class="info">* Отмечены поля обязательные для заполнения</span><br>
            <button class="btn" type="submit" v-on:click="submitForm()">создать</button>

        </form>
    </div>
</template>

<script>
import CountrySelector from './CountrySelector.vue'
import { required, numeric, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'CustomerCreationForm',
    components: { CountrySelector },
    data() {
        return {
            form: {
                fname: '',
                lname: '',
                patronymic: '',
                date_of_birth: '',
                phone: '',
                sex: '',
                client_group: [],
                doctor: '',
                sms: '',
                index: '',
                country: '',
                area: '',
                city: '',
                street: '',
                house: '',
                document: '',
                series: '',
                number: '',
                issued_by: '',
                date_of_issue: ''
            },
            expanded: false,
        }
    }, 
    methods: {
        formatPhone() {
            var x = this.form.phone.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.form.phone = !x[2] ? x[1] : x[1] +  ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '');
        },
        showCheckboxes() {
            if (!this.expanded) {
                this.$refs.checkboxes.style.display = "block";
                this.expanded = true;
            } else {
                this.$refs.checkboxes.style.display = "none";
                this.expanded = false;
            }
        },
        hideCheckbowes() {
            if (!this.expanded) {
                this.$refs.checkboxes.style.display = "block";
                this.expanded = true;
            } else {
                this.$refs.checkboxes.style.display = "none";
                this.expanded = false;
            }
        },
        submitForm() { 
            this.$v.$touch();
            if (!this.$v.$invalid) {
                alert('Новый клиент успешно создан!');
            } else {
                alert('При заполнении формы были допущены ошибки.\nПеред отправкой данных необходимо их исправить.');
            }
        }
    },
    validations: {
        form: {
            fname:  { 
                required,
                alpha: val => /^([а-яё]*[ ]?)*$/i.test(val)
            },
            lname:  {
                required,
                alpha: val => /^([а-яё]*[ ]?)*$/i.test(val)
            },
            patronymic: {
                alpha: val => /^([а-яё]*[ ]?)*$/i.test(val)
            },
            date_of_birth: { 
                required,
                dateBirthValid:  val => val <= new Date().toISOString().slice(0, 10)
            },
            phone:  {
                required,
                phoneValid: val => /^[7]\s[(]\d{3}[)]\s\d{3}[-]\d{4}/i.test(val)
            },
            client_group: { required },
            index: {
                numeric,
                minLength: minLength(6)
            },
            area: {
                alpha: val => /^([а-яё]*[ ]?)*$/i.test(val)
            },
            city: {
                required,
                cityNameValid: val => /^[а-яё]+(?:[\s-][а-яё]+)*$/i.test(val)
            },
            street: {
                streetNameValid: val => /^[а-яё]+(?:[\s-][а-яё]+)*$/i.test(val)
            },
            house: {
                houseNumberValid: val => /^[1-9][0-9]*([a-z]|[а-я]|(\/[1-9][0-9]*))?$/i.test(val)
            },
            document: { required },
            series: {
                numeric,
                minLength: minLength(4)
            },
            number: {
                numeric,
                minLength: minLength(6)
            },
            issued_by: {
                alpha: val => /^([а-яё]*[ ]?)*$/i.test(val)
            },
            date_of_issue: { 
                required,
                dateIssueValid:  val => val <= new Date().toISOString().slice(0, 10)
            }
        }
    },
}
</script>

<style lang="sass" scoped>

.form-wrapper
    display: flex
    justify-content: center

.form
    display: block
    width: 400px
    padding: 10px 50px
    margin-top: 10vh
    margin-bottom: 10vh
    background-color: white
    border: 2px solid white

    h2
        text-align: center
        margin-top: 30px
        margin-bottom: 40px
    
    h3
        margin-top: 35px
        margin-bottom: 8px
        text-align: center
        // margin-left: 10px

    @media (max-width: 550px)
        width: 90vw
        padding: 5px 20px

/* Bottom bars  */
.bar
    position: relative
    display: block
    width: 100%
    &:before, 
    &:after
        content: ''
        height: 2px
        width: 0
        bottom: 0
        position: absolute
        background: #5264AE 
        transition: 0.2s ease all
        -moz-transition: 0.2s ease all
        -webkit-transition: 0.2s ease all
    &:before
        left: 50%
    &:after
        right: 50%
    
    @media (max-width: 550px)
        width: 102%

/* Block, groups */
.block
    margin-bottom: 40px
    position: relative

.group-1
  position: relative
  margin-top: 20px

  input
    width: 95%
    display: block
    text-transform: capitalize

.group-2
    display: flex
    flex-wrap: wrap
    margin-bottom: 30px
    
    input
        width: 36%
        margin-left: 8px
        margin-top: 10px
        margin-right: 20px
        border: 1px solid #5264AE
        border-radius: 4px
        padding: 4px 5px 4px 15px
    
    @media (max-width: 550px)
        input
            width: 50%
    
    @media (max-width: 550px)
        input
            width: 70%

.group-3
    display: flex
    flex-wrap: wrap
    justify-content: start
    width: 100px
    margin-bottom: 20px

    label
        color: black
        font-size: 0.9rem
        margin-top: 10px
        margin-left: 5px
    
    input
        cursor: pointer
        margin-top: 10px

/* Check-box */
.check-box
    margin-top: 10px
    margin-bottom: 20px
    position: relative
    display: flex
    flex-wrap: wrap
    justify-content: start
    width: 40%

    div
        margin-bottom: 10px
        margin-left: 2px
    
    label
        color: black
        font-size: 0.9rem
        margin-left: 5px

/* Select */
.select-box
    margin-top: 10px
    border-radius: 20px
    width: 100%
    background-color: #ECEDF1
    border: 1px solid #5264AE

    select
        cursor: pointer  
        display: block
        width: 91%
        margin-left: 1.2rem
        padding: 0.4rem 0rem
        background: none
        border: none
        outline: none
        font-family: inherit
        -webkit-appearance: none
        -moz-appearance: none
        appearance: none
        background: url('../assets/down-arrow.png') no-repeat right
        background-size: 10px 10px, 10px 10px, 3em 3em

        @media (max-width: 550px)
            width: 88%
  
/* Checkbox SMS */
.checkbox-sms
    margin-top: 30px
    margin-bottom: 20px
    label
        font-size: 0.85rem
        margin-right: 5px
    
    input
        cursor: pointer

/* Separator */
.separator 
    // margin: 2px
    margin-bottom: 30px
    border: 1px solid #5264AE

/* Multi-select */
.multi-select-box
    position: relative
    cursor: pointer

.over-select 
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0

#checkboxes 
    display: none
    width: 100%
    position: absolute
    background-color: #ECEDF1
    border: 1px solid #5264AE
    border-radius: 12px

    label 
        cursor: pointer
        display: block
        margin: auto
        padding: 5px 10px
        color: black
        font-size: 0.9rem

        &:hover 
            background-color: white
            border-radius: 20px

/* Small input */
.small-input
    margin-bottom: 20px
    margin-right: 40px
    display: flex
    flex-wrap: wrap
    justify-content: start

    input
        text-align: center
        width: 100%
        margin-left: 8px
        margin-top: 10px
        border: 1px solid #5264AE
        border-radius: 4px
        padding: 6px
    
/* Index */
.index
    input
        width: 22%
        margin-right: 20%

    @media (max-width: 550px)
        input
            width: 30%

/* House */
.house 
    margin-top: 20px

    input
        width: 12%
        text-align: center
        margin-left: 5px
        padding-bottom: 0

/* Document */
.document
    margin-top: 10px

.series-number
    margin-top: 30px

.series
    input
        width: 22%
        margin-right: 40%

    @media (max-width: 550px)
        input
            width: 25%

.number   
    input
        width: 25%
        margin-right: 40%

    @media (max-width: 550px)
        input
            width: 30%

.issued_by
    margin-top: 30px

    input
        text-transform: none

.date-of-issue
    margin-top: 30px

/* Info */
.info
    font-size: .7rem

/* Submit button */
.btn
    cursor: pointer
    margin-top: 20px
    margin-bottom: 20px
    padding: 5px 10px
    border: 2px solid #5264AE
    border-radius: 5px
    background-color: #ECEDF1
    font-size: 1rem
    font-family: inherit

/* Validate errors */
.error
    margin-top: 6px
    margin-left: 15px
    color: red
    font-size: 0.7rem

</style>
