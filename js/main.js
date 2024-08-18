const loaderData = async (id=13,isShowAll,) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${id}`);
    const data = await res.json();
    const phones = data.data;
    SetData(phones,isShowAll);

}

const SetData = (phones,isShowAll) =>{
        const Container = document.getElementById('container');
        Container.textContent = '';
        const ShowBtn = document.getElementById('show-btn');
        if(phones.length > 6 && !isShowAll){
            ShowBtn.classList.remove('hidden');
        }else{
            ShowBtn.classList.add('hidden');
        }
        if(!isShowAll){
            phones = phones.slice(0,6);
        }
        
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="border p-6 rounded-xl text-center">
            <div class=" p-6 flex justify-center">
                 <img src=${phone.image} alt="">
            </div>
                <h1>${phone.phone_name}</h1>
                <p>${phone.slug}</p>
                <button onclick="ShowModalClick('${phone.slug}')" class="p-2 rounded-lg my-2 bg-violet-600 w-full text-xl text-white">Show Details</button>
            </div>
            `
            Container.appendChild(div);
        })
        ToggleSpinnerLoading(false);
}
// Show Details 
const ShowModalClick = async (id) =>{
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        const phone = data.data;
        ShowModal(phone);
}
const ShowModal = (phone) =>{
    console.log(phone);
    my_modal_5.showModal();
    const Modal = document.getElementById('modal-container');
    Modal.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <img src=${phone.image}>
        <h1>${phone.name}</h1>
        <p>Storage : ${phone.mainFeatures.storage}</p>
        <p>Display Size : ${phone.mainFeatures.displaySize}</p>
        <p>Memory : ${phone.mainFeatures.memory}</p>
        <p>Chip Set : ${phone.mainFeatures.chipSet}</p>
        <p>Slug : ${phone.slug}</p>
        <p>Brand : ${phone.brand}</p>
        <p>GPS : ${phone.others?.GPS}</p>
    `
    Modal.appendChild(div);
}
const SearchField = (isShowAll) =>{
    ToggleSpinnerLoading(true);
    const SearchInput = document.getElementById('search-input');
    const SearchText = SearchInput.value;
    loaderData(SearchText,isShowAll);
}
const ToggleSpinnerLoading = (isLoading) =>{
    const Spinner = document.getElementById('Spinner');
    if(isLoading){
        Spinner.classList.remove('hidden');
    }else{
        Spinner.classList.add('hidden');
    }
}
const SearchClick = () =>{
    SearchField();
}
const handleClickBtn = () =>{
    SearchField(true);
}
loaderData();