import * as Joi from 'joi';

export const ID_PARAMETER = Joi.string();

export const CV_PAYLOAD = Joi.object().keys({
    titre: Joi.string(),
    nom: Joi.string(),
    prenom: Joi.string(),
    photo: Joi.string(),
    adresse: Joi.object().keys({
        street: Joi.string(),
        postalCode: Joi.number(),
        city: Joi.string()
    }),
    email: Joi.string().email(),
    permis: Joi.boolean(),
    vehicule: Joi.boolean(),
    age: Joi.number(),
    telephone: Joi.string(),
    nationalite: Joi.string(),
    experience: Joi.object().keys({
        s1: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s2: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s3: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s4: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s5: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s6: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s7: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s8: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s9: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s10: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        })
    }),
    formation: Joi.object().keys({
        s1: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s2: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s3: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s4: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s5: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s6: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s7: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s8: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s9: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s10: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        })
    }),
    hobbie: Joi.object().keys({
        s1: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s2: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s3: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s4: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s5: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s6: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s7: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s8: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s9: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        }),
        s10: Joi.object().keys({
            titre: Joi.string(),
            date: Joi.string(),
            description: Joi.string()
        })
    })
});


export const CV_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    titre: Joi.reach(CV_PAYLOAD, 'titre'),
    nom: Joi.reach(CV_PAYLOAD, 'nom'),
    prenom: Joi.reach(CV_PAYLOAD, 'prenom'),
    photo: Joi.reach(CV_PAYLOAD, 'photo'),
    adresse: Joi.reach(CV_PAYLOAD, 'adresse'),
    email: Joi.reach(CV_PAYLOAD, 'email'),
    permis: Joi.reach(CV_PAYLOAD, 'permis'),
    vehicule: Joi.reach(CV_PAYLOAD, 'vehicule'),
    age: Joi.reach(CV_PAYLOAD, 'age'),
    telephone: Joi.reach(CV_PAYLOAD, 'telephone'),
    nationalite: Joi.reach(CV_PAYLOAD, 'nationalite'),
    experience: Joi.reach(CV_PAYLOAD, 'experience'),
    formation: Joi.reach(CV_PAYLOAD, 'formation'),
    hobbie: Joi.reach(CV_PAYLOAD, 'hobbie')
});

export const CVS_RESPONSE = Joi.array().items(
    CV_RESPONSE
).unique().min(1);
