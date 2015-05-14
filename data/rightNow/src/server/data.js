module.exports = {
    people: getPeople(),
    programs: getPrograms()
};

function getPeople() {
    return [
        {id: 1, firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida'},
        {id: 2, firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California'},
        {id: 3, firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York'},
        {id: 4, firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota'},
        {id: 5, firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota'},
        {id: 6, firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina'},
        {id: 7, firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming'},
        {id: 8, firstName: 'Aaron', lastName: 'Jinglehiemer', age: 22, location: 'Utah'}
    ];
}

function getPrograms() {
    // jscs:disable
    return [
        {'Id':5,'CreatedAt':'2015-05-01T00:00:00', 'UpdatedAt':'2015-05-01T00:00:00', 'Coach':{
            'FirstName':'User 1', 'LastName':'Smith', 'Avatar':null, 'AvatarFileUrl':null, 
            'Experience':null, 'ABN':null, 'BusinessName':null, 'Address':null, 'Position':null, 
            'CoachingExperience':null, 'WorkExperience':null, 'Email':'user1@ewide.biz', 
            'EmailConfirmed':true,
            'PasswordHash':'ADpRRVqrrmh0QUQvjfG5bU/N09FjDOm9jBEloNcrWGXjdPlaITUA+xgUi2yJOeEJiA==',
            'SecurityStamp':'8e7eb30b-5484-4215-a1ca-9126f9c54fcb', 'PhoneNumber':null, 
            'PhoneNumberConfirmed':false, 'TwoFactorEnabled':false, 'LockoutEndDateUtc':null, 
            'LockoutEnabled':false, 'AccessFailedCount':0, 'Roles':[], 'Claims':[], 'Logins':[], 
            'Id':'661dc953-05eb-4ec5-b3af-37039d7e9924', 'UserName':'user1@ewide.biz'
        }, 'Coachee':{
            'FirstName':'User 2', 'LastName':'Smith', 'Avatar':null, 'AvatarFileUrl':null, 
            'Experience':null, 'ABN':null, 'BusinessName':null, 'Address':null, 'Position':null, 
            'CoachingExperience':null, 'WorkExperience':null, 'Email':'user2@ewide.biz', 
            'EmailConfirmed':true,
            'PasswordHash':'AISC+h0V3ZHZQGSiSxpDeZwJzyg1S4/n1bfQ5/ykVcdw9yD4KvlFSsxR2TslIB1GPg==', 
            'SecurityStamp':'1cdf2fc9-05e8-4687-99de-b232e0f679fd', 'PhoneNumber':null, 
            'PhoneNumberConfirmed':false, 'TwoFactorEnabled':false, 'LockoutEndDateUtc':null, 
            'LockoutEnabled':false, 'AccessFailedCount':0, 'Roles':[], 'Claims':[], 'Logins':[], 
            'Id':'528facd3-f39f-4e82-a98b-f9ea30335bab', 'UserName':'user2@ewide.biz'
        }, 'LearningPlan':null}, 
        {'Id':6, 'CreatedAt':'2015-05-01T00:00:00', 'UpdatedAt':'2015-05-01T00:00:00', 'Coach':{
            'FirstName':'User 1', 'LastName':'Smith','Avatar':null,'AvatarFileUrl':null,
            'Experience':null,'ABN':null,'BusinessName':null,'Address':null,'Position':null,
            'CoachingExperience':null,'WorkExperience':null,'Email':'user1@ewide.biz',
            'EmailConfirmed':true,
            'PasswordHash':'ADpRRVqrrmh0QUQvjfG5bU/N09FjDOm9jBEloNcrWGXjdPlaITUA+xgUi2yJOeEJiA==',
            'SecurityStamp':'8e7eb30b-5484-4215-a1ca-9126f9c54fcb','PhoneNumber':null,
            'PhoneNumberConfirmed':false,'TwoFactorEnabled':false,'LockoutEndDateUtc':null,
            'LockoutEnabled':false,'AccessFailedCount':0,'Roles':[],'Claims':[],'Logins':[],
            'Id':'661dc953-05eb-4ec5-b3af-37039d7e9924','UserName':'user1@ewide.biz'
        },'Coachee':{
            'FirstName':'User 2','LastName':'Smith','Avatar':null,'AvatarFileUrl':null,
            'Experience':null,'ABN':null,'BusinessName':null,'Address':null,'Position':null,
            'CoachingExperience':null,'WorkExperience':null,'Email':'user2@ewide.biz',
            'EmailConfirmed':true,
            'PasswordHash':'AISC+h0V3ZHZQGSiSxpDeZwJzyg1S4/n1bfQ5/ykVcdw9yD4KvlFSsxR2TslIB1GPg==',
            'SecurityStamp':'1cdf2fc9-05e8-4687-99de-b232e0f679fd','PhoneNumber':null,
            'PhoneNumberConfirmed':false,'TwoFactorEnabled':false,'LockoutEndDateUtc':null,
            'LockoutEnabled':false,'AccessFailedCount':0,'Roles':[],'Claims':[],'Logins':[],
            'Id':'528facd3-f39f-4e82-a98b-f9ea30335bab','UserName':'user2@ewide.biz'
        },'LearningPlan':null},
        {'Id':7,'CreatedAt':'2015-05-01T00:00:00','UpdatedAt':'2015-05-01T00:00:00','Coach':{
            'FirstName':'User 1','LastName':'Smith','Avatar':null,'AvatarFileUrl':null,
            'Experience':null,'ABN':null,'BusinessName':null,'Address':null,'Position':null,
            'CoachingExperience':null,'WorkExperience':null,'Email':'user1@ewide.biz',
            'EmailConfirmed':true,
            'PasswordHash':'ADpRRVqrrmh0QUQvjfG5bU/N09FjDOm9jBEloNcrWGXjdPlaITUA+xgUi2yJOeEJiA==',
            'SecurityStamp':'8e7eb30b-5484-4215-a1ca-9126f9c54fcb','PhoneNumber':null,
            'PhoneNumberConfirmed':false,'TwoFactorEnabled':false,'LockoutEndDateUtc':null,
            'LockoutEnabled':false,'AccessFailedCount':0,'Roles':[],'Claims':[],'Logins':[],
            'Id':'661dc953-05eb-4ec5-b3af-37039d7e9924','UserName':'user1@ewide.biz'
        },'Coachee':{
            'FirstName':'User 2','LastName':'Smith','Avatar':null,'AvatarFileUrl':null,
            'Experience':null,'ABN':null,'BusinessName':null,'Address':null,'Position':null,
            'CoachingExperience':null,'WorkExperience':null,'Email':'user2@ewide.biz',
            'EmailConfirmed':true,
            'PasswordHash':'AISC+h0V3ZHZQGSiSxpDeZwJzyg1S4/n1bfQ5/ykVcdw9yD4KvlFSsxR2TslIB1GPg==',
            'SecurityStamp':'1cdf2fc9-05e8-4687-99de-b232e0f679fd','PhoneNumber':null,
            'PhoneNumberConfirmed':false,'TwoFactorEnabled':false,'LockoutEndDateUtc':null,
            'LockoutEnabled':false,'AccessFailedCount':0,'Roles':[],'Claims':[],'Logins':[],
            'Id':'528facd3-f39f-4e82-a98b-f9ea30335bab','UserName':'user2@ewide.biz'
        },'LearningPlan':null}
    ];
    // jscs:enable
}
