export function deslugifyStaff(string) {
    try {
        let name: String;
        name = string.substring(string.lastIndexOf('/') + 1);
        name = name.split('_')[0];
        let splitName = name.split('-');
        name = ""
        for (let subname of splitName) {

            name += subname[0].toUpperCase() + subname.slice(1) + ' ';
        }
        return name;

    }
    catch {
        return string
    }
}