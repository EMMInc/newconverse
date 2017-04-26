options = []

    for business in businesses:
        subtitle = ""
        if 'price' in business and business['price'] != "":
            subtitle += business['price'] + " - "
        subtitle += business['address'] 
        if 'distance' in business:
            subtitle += " (" + str(business['distance']) + " mi.)"
        if 'is_open_now' in business:
            subtitle += "\n" + "Open now - " if business['is_open_now'] else "\n" 
        if 'hours_today' in business and len(business['hours_today']) > 0:
            subtitle += "Hours today: %s"%(business['hours_today'])
        subtitle += "\n" + business['categories']

        img_url = business['image_url'] if business['image_url'] != "" else url_for('static', filename='assets/img/empty-placeholder.jpg', _external=True)
        
        obj = {
                "title": business['name'] + " - " + business['rating'] ,
                "image_url": img_url,
                "subtitle": subtitle,
                "buttons":[
                    {
                    "type":"web_url",
                    "url": business['url'],
                    "title":"View details"
                    }
                    # ,{
                    # "type":"postback",
                    # "title":"Start Chatting",
                    # "payload":"USER_DEFINED_PAYLOAD"
                    # }          
                ]
                }
        options.append(obj) 
    r = requests.post("https://graph.facebook.com/v2.6/me/messages",
                      params={"access_token": token},
                      data=json.dumps({
                            "recipient": {"id": user_id},
                            "message":{
                                "attachment":{
                                    "type":"template",
                                    "payload":{
                                        "template_type":"generic",
                                        "elements": options
                                    }
                                }
                            }
                      }),
                      headers={'Content-type': 'application/json'})
    if r.status_code != requests.codes.ok:
        print r.text