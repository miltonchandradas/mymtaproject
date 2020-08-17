using {demo} from '../db/schema';

service ProjectService {

    entity Users as SELECT from demo.Users;

    entity Projects as SELECT from demo.Projects;

    function getDate() returns Date;

    function getProjectMembers(id: String) returns array of String;

}
