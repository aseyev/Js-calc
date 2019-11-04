const form = $('#price-form');

let formData = form.serializeJSON();

function showHideBlocks() {
    if ( formData.type == 'site') {
        $('[data-name="pages"]').show();
        $('[data-name="landing"]').hide();
        $('[name="sections"]').val('0');
    } else {
        $('[data-name="pages"]').hide();
        $('[data-name="landing"]').show();
        $('[name="pages-unique"]').val('0');
        $('[name="pages-general"]').val('0');
    }
    if ( formData.mobile == 'on') {
        $('[data-name="mobile"]').show();
    } else {
        $('[data-name="mobile"]').hide();
        $('[name="mobile-number"]')[0].checked = true;
        // $('[name="mobile-number"]')[1].checked = false; зачем менять ВСЕ радиобаттоны? Активен то 1.
        // $('[name="mobile-number"]')[2].checked = false;
    }
}
//отобразили нужные блоки при загрузке
showHideBlocks();

// отслеживаем клики-кнопки в форме
form.on ('keyup change paste', 'input, select, textarea', function(){

    // отслеживаем и меняем блоки в формах, удаляем инфу из скрытых блоков 
    formData = form.serializeJSON();
    showHideBlocks();
    // console.log('1 ', formData);

    // обновляем данные в форме для расчета цены
    formData = form.serializeJSON();

    updatePrice( calculatePrice() );
});

function calculatePrice() {
    // начинаем считать цену
    let totalPrice = 0;
    totalPrice = 
        formData['pages-unique'] * 50 + 
        formData['pages-general'] * 20 +
        formData['sections'] * 20 +
        formData['carousel'] * 15 +
        formData['modals'] * 10 +
        formData['forms'] * 15;

    // мобильный мультипликатор
    let multipleMobile = 1;
    if (formData['mobile-number'] == 2) {
        multipleMobile = 1.3;
    } else if (formData['mobile-number'] == 3) {
        multipleMobile = 1.5;
    }

    // дополнительные мультипликаторы
    let mPixelPerfect = 1;
    if (formData['pixelPerfect'] == 'on') {mPixelPerfect = 1.2;}

    let mRetina = 1;
    if (formData['retinaReady'] == 'on') {mRetina = 1.2;}

    let mGooglePageSpeed = 1;
    if (formData['googlePageSpeed'] == 'on') {mGooglePageSpeed = 1.2;}

    let mUrgent = 1;
    if (formData['urgentOrder'] == 'on') {mUrgent = 1.5;}

    totalPrice = totalPrice * multipleMobile * mPixelPerfect * mRetina * mGooglePageSpeed * mUrgent;

    return totalPrice;
}

function updatePrice(price) {
    $('#total-price').text(price);
}