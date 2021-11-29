import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, onValue, update, set } from "firebase/database";

const firebaseConfig = {
    //TODO: insert firebase config data
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database)

export const listenStatus = async (process = ()=>{} ) => {
    onValue(child(dbRef, "/entidades/-MNnlN1q-yIjTKEgGeP5/equipamentos/-MOWVcaMjn0VK6qqKiu2"), (snapshot) => {
        let data = {};
        if (snapshot.exists())
            data = snapshot.val();
        process(data);
    });
};
export const updateStatus = async (data,path = false) => {
    const updates = {};
    if (path) {
        updates[path] = data;
        update(child(dbRef, "/entidades/-MNnlN1q-yIjTKEgGeP5/equipamentos/-MOWVcaMjn0VK6qqKiu2"), updates)
    }
    else {
        set(child(dbRef, "/entidades/-MNnlN1q-yIjTKEgGeP5/equipamentos/-MOWVcaMjn0VK6qqKiu2"), data)
    }
}

export const getCultivos = async (process = ()=>{} ) => {
    let equipamento = (await get(child(dbRef, "/entidades/-MNnlN1q-yIjTKEgGeP5/equipamentos/-MOWVcaMjn0VK6qqKiu2"))).val()
    onValue(child(dbRef, "/entidades/-MNnlN1q-yIjTKEgGeP5/cultivos"), (snapshot) => {
        let cultivos = snapshot.val() || {};
        let returnArr = [];
        Object.values(cultivos).forEach((c) => {
            if (c.posicao.X + c.dimensao.X > equipamento.posicao.X &&
            c.posicao.X < equipamento.dimensao.X + equipamento.posicao.X &&
            c.posicao.Y + c.dimensao.Y > equipamento.posicao.Y &&
            c.posicao.Y < equipamento.dimensao.Y + equipamento.posicao.Y )
            returnArr.push(c)
        })
        process(returnArr);
    });
}

export const enviaInstrucao = async (instrucao) => {
    const updates = {
        instrucao,
        nova: true
    }
    update(child(child(dbRef, "/entidades/-MNnlN1q-yIjTKEgGeP5/equipamentos/-MOWVcaMjn0VK6qqKiu2"), "comunicacao"), updates)
}
