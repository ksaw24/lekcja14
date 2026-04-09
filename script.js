$(document).ready(function () {

    $.getJSON("students.json", function (data) {

        let table = $("#studentsTable").DataTable({
            data: data,

            columns: [
                { data: "id" },
                { data: "name" },
                { data: "surname" },
                { data: "age" },
                { data: "email" },
                { data: "major" },
                {
                    data: null,
                    render: function () {
                        return `
                            <button class="edit">Edytuj</button>
                            <button class="delete">Usuń</button>
                        `;
                    }
                }
            ],

            // funkcje DataTables
            paging: true,
            searching: true,
            ordering: true,

            pageLength: 10,
            lengthMenu: [10, 25, 50],

            // eksport
            dom: 'Bfrtip',
            buttons: [
                'csvHtml5',
                'pdfHtml5'
            ]
        });

        // USUWANIE
        $('#studentsTable tbody').on('click', '.delete', function () {
            table.row($(this).parents('tr')).remove().draw();
        });

        // EDYCJA (wiek)
        $('#studentsTable tbody').on('click', '.edit', function () {
            let row = table.row($(this).parents('tr'));
            let data = row.data();

            let newAge = prompt("Podaj nowy wiek:", data.age);

            if (newAge !== null && newAge !== "") {
                data.age = parseInt(newAge);
                row.data(data).draw();
            }
        });

    });

});