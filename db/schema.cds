namespace demo;

type Address {
    street : String(100);
    city   : String(100);
    state  : String(100);
    zip    : String(10);
}

type Gender : String enum {
    male;
    female;
}

entity Users {
    key id      : UUID;
        name    : String(100);
        email   : String(100);
        phone   : String(100);
        gender  : Gender;
        address : Address;
        project : Association to Projects;
}

entity Projects {
    key id          : UUID;
        name        : String(100);
        description : String(1000);
        user        : Association to many Users
                          on user.project = $self;
}
