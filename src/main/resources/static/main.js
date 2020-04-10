$(document).ready(function() {
    $(".btn-edit-user").click(function(e) {
        console.log(e.target.dataset.userid)
        $.ajax({
            url: "/admin/edit",
            method: 'GET',
            data: {
                id: e.target.dataset.userid
            }
        }).then(function(data) {
            console.log(data)
            $('#modal-edit-user').empty();
            let form = $("<form id='edit-user' method='post' action='/admin/edit'>")
            let formGroup = "<div class='form-group'>"

            let formGroupID = $(formGroup)
            formGroupID.append("<label for='id'>ID</label>",
                "<input type='text' name='id' id='id' class='form-control' readonly value=" + data.id + ">")
            form.append(formGroupID)

            let formGroupFM = $(formGroup)
            formGroupFM.append("<label for='first_name'>First name</label>",
                "<input required type='text' name='first_name' id='first_name' class='form-control' value=" + data.firstName + ">")
            form.append(formGroupFM)

            let formGroupLM = $(formGroup)
            formGroupLM.append("<label for='last_name'>Last name</label>",
                "<input required type='text' name='last_name' id='last_name' class='form-control' value=" + data.lastName + ">")
            form.append(formGroupLM)

            let formGroupAge = $(formGroup)
            formGroupAge.append("<label for='age'>Age</label>",
                "<input required type='text' name='age' id='age' class='form-control' value=" + data.age + ">")
            form.append(formGroupAge)

            let formGroupEmail = $(formGroup)
            formGroupEmail.append("<label for='email'>Emai</label>",
                "<input required type='text' name='email' id='email' class='form-control' value=" + data.email + ">")
            form.append(formGroupEmail)

            let formGroupPassword = $(formGroup)
            formGroupPassword.append("<label for='email'>Password</label>",
                "<input required type='text' name='password' id='password' class='form-control' value=" + data.password + ">")
            form.append(formGroupPassword)
            console.log(data.roles)
            let adminInput = data.roles.includes("ADMIN") ? "<input type='checkbox' value='ADMIN' name='ADMIN' class='form-check-input' id='admin-new-user' checked>" :
                "<input type='checkbox' value='ADMIN' name='ADMIN' class='form-check-input' id='admin-new-user'>"

            let userInput = data.roles.includes("USER") ? "<input type='checkbox' value='USER' name='USER' class='form-check-input' id='user-new-user' checked>" :
                "<input type='checkbox' value='USER' name='USER' class='form-check-input' id='user-new-user'>"

            let formCheckbox = "<div class='form-group form-check'>"
            let formCheckboxAdmin = $(formCheckbox)
            formCheckboxAdmin.append(adminInput, "<label class='form-check-label' for='admin-new-user'>Admin</label>")
            form.append(formCheckboxAdmin)

            let formCheckboxUser = $(formCheckbox)
            formCheckboxUser.append(userInput, "<label class='form-check-label' for='admin-new-user'>USER</label>")
            form.append(formCheckboxUser)

            form.appendTo("#modal-edit-user")
        });
    });

    $(".side-menu").click(function (e) {
        $(".side-menu").toggleClass( "active" );
    })
});

/*{"id":1,"firstName":"qwe","lastName":"qwe","age":32,"email":"qwe@qwe.qwe","password":"qwe","roles":["ADMIN","USER"],"enabled":true,"authorities":["ADMIN","USER"],"username":"qwe@qwe.qwe","accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}*/
