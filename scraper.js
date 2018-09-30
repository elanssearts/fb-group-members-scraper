//scraper
const Scrap = setInterval(() => {
    const load = document.querySelectorAll('a.uiMorePagerPrimary');
    if (load.length > 0) {
        window.scrollTo(0, document.body.scrollHeight);
        load.forEach(e => {
            e.click()
        });
    } else {
        console.clear();
        const profiles = document.querySelectorAll('div.lists .fsl a[data-hovercard*="/ajax/"]');
        let payload = []
        profiles.forEach(e => {
            let profile_id = e.dataset.hovercard.replace(/.+id=([0-9]+)&.+/, '$1');
            let name = e.text;
                let photo = `https://graph.facebook.com/${profile_id}/picture?width=9999`;
            member = {
                profile_id,
                name,
                photo
            }
                payload.push(member);
        });
        let data = {
            "Name": "Group Members",
            "members": payload
        }
        console.log(data)
        clearTimeout(Scrap);
    }
}, 5000);
