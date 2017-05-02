/**
 * Created by VirtualB on 4/27/2017.
 */
window.userId
window.offerId

$(document).on('click', '.confirmDelete', function () {
    $.ajax({
        url: "/users",
        type: "DELETE",
        headers: { user_id: window.userId, 'token':  $("#token").val() }
    }).done(function(responseData){
        $("#deleteModal").modal('hide');
        window.location = 'allUsers'
    });
});


$(document).on('click', '.deleteClass', function () {
    var userId = $(this).attr("data-id");
    window.userId = userId;
});


$('#userModal').on('hidden.bs.modal', function () {
    $("#addUpdateUserForm")[0].reset();
    $("#passwordDiv").show();
});


$(document).on('click', '.editClass', function () {
    var id = $(this).attr("data-id");
    var city = $(this).attr("data-city");
    var email = $(this).attr("data-email");
    var phone = $(this).attr("data-phone");
    var username = $(this).attr("data-username");
    var userType = $(this).attr("data-userType");
    $("#id").val(id);
    $("#city").val(city);
    $("#email").val(email);
    $("#phone").val(phone);
    $("#username").val(username);
    $("#userType").val(userType);
    $("#passwordDiv").hide();
    $("#userModal").modal('show');


});


$(document).on('click', '#addorUpdate', function () {

    var form = $( "#addUpdateUserForm" ).serialize();
    var type = '';
    var url = '';
    if($("#id").val() == 0){
        type = 'POST';
        url = "/users";
    } else {
        type = 'PUT';
        url = "/users/"+$("#id").val();
    }
    $.ajax({
        url: url,
        type: type,
        headers: { id: $("#id").val(), 'token':  $("#token").val() },
        data: form
    }).done(function(responseData){
        $("#userModal").modal('hide');
        window.location = 'allUsers'
    });
});


/*
 --- --- ------------------   Offers Js -- ------------------------
 */



$(document).on('click', '.confirmDeleteOffer', function () {
    $.ajax({
        url: "/offers",
        type: "PUT",
        headers: { id: window.offerId, 'token':  $("#token").val() }
    }).done(function(responseData){
        $("#offerModal").modal('hide');
        window.location = 'allOffers'
    });
});


$(document).on('click', '.deleteOfferBtn', function () {
    var offerId = $(this).attr("data-id");
    window.offerId = offerId;
});


$('#offerModal').on('hidden.bs.modal', function () {
    $("#addUpdateOfferForm")[0].reset();
    $("#catTypeDiv").show();
    $("#categoryId").prop( "disabled", false );

});

$('#addnewOffer').click(function () {

    $(".modal-title").html('Add Offer');

    $.ajax({
        url: "/categories",
        type: "GET",
        headers: {'token':  $("#token").val() }
    }).done(function(responseData) {
        var html = '';
        html += '<option value="-1">Please Select</option>';
        $.each(responseData, function (key, val) {
            html += '<option value="' + val.id + '">' + val.title + '</option>';
        });
        $("#categoryId").html(html);
    });

});


$(document).on('click', '.editOffer', function () {

    var id = $(this).attr("data-id");
    var title = $(this).attr("data-title");
    var description = $(this).attr("data-description");

    $(".modal-title").html('Edit Offer');
    $("#Offerid").val(id);
    $("#title").val(title);
    $("#description").val(description);

    $("#catTypeDiv").hide();
    $("#categoryId").prop( "disabled", true );
    $("#offerModal").modal('show');

});



$(document).on('click', '#addorUpdateOffer', function () {

    var form = $( "#addUpdateOfferForm" ).serialize();
    var type = '';
    var url = '';

    if($("#Offerid").val() == 0){
        type = 'POST';
        url = "/offers";
    } else {
        type = 'PUT';
        url = "/offers/"+$("#Offerid").val();
    }

    $.ajax({
        url: url,
        type: type,
        headers: { id: $("#Offerid").val(), 'token':  $("#token").val() },
        data: form
    }).done(function(responseData){
        $("#offerModal").modal('hide');
        window.location = 'allOffers'
    });
});

