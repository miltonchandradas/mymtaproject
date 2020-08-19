using {demo} from '../db/schema';

service ProjectService {

    entity Users    as select from demo.Users;
    entity Projects as select from demo.Projects;
    function getDATE() returns Date;
    function getProjectMembers(id : String) returns array of String;


    type moveResult {
        code: Integer;
        success     : Boolean;
        moveStatus  : String;
        userId      : String;
        username    : String;
        projectId   : String;
        projectname : String;

    };

    action moveUserToAnotherProject(userId : String, projectId: String) returns moveResult;

}
