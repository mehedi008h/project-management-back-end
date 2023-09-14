export const resetPasswordTemplate = (firstName: string, link: string) => {
    const message = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
    >
        <head>
            <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG />
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <title></title>
    
            <style type="text/css">
                @media only screen and (min-width: 620px) {
                    .u-row {
                        width: 600px !important;
                    }
                    .u-row .u-col {
                        vertical-align: top;
                    }
    
                    .u-row .u-col-100 {
                        width: 600px !important;
                    }
                }
    
                @media (max-width: 620px) {
                    .u-row-container {
                        max-width: 100% !important;
                        padding-left: 0px !important;
                        padding-right: 0px !important;
                    }
                    .u-row .u-col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
                    .u-row {
                        width: 100% !important;
                    }
                    .u-col {
                        width: 100% !important;
                    }
                    .u-col > div {
                        margin: 0 auto;
                    }
                }
                body {
                    margin: 0;
                    padding: 0;
                }
    
                table,
                tr,
                td {
                    vertical-align: top;
                    border-collapse: collapse;
                }
    
                p {
                    margin: 0;
                }
    
                .ie-container table,
                .mso-container table {
                    table-layout: fixed;
                }
    
                * {
                    line-height: inherit;
                }
    
                a[x-apple-data-detectors="true"] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
    
                table,
                td {
                    color: #000000;
                }
                #u_body a {
                    color: #161a39;
                    text-decoration: underline;
                }
            </style>
    
            <!--[if !mso]><!-->
            <link
                href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"
                rel="stylesheet"
                type="text/css"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
                rel="stylesheet"
                type="text/css"
            />
            <!--<![endif]-->
        </head>
    
        <body
            class="clean-body u_body"
            style="
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                background-color: #f9f9f9;
                color: #000000;
            "
        >
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table
                id="u_body"
                style="
                    border-collapse: collapse;
                    table-layout: fixed;
                    border-spacing: 0;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    vertical-align: top;
                    min-width: 320px;
                    margin: 0 auto;
                    background-color: #f9f9f9;
                    width: 100%;
                "
                cellpadding="0"
                cellspacing="0"
            >
                <tbody>
                    <tr style="vertical-align: top">
                        <td
                            style="
                                word-break: break-word;
                                border-collapse: collapse !important;
                                vertical-align: top;
                            "
                        >
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
                            <div
                                class="u-row-container"
                                style="padding: 0px; background-color: #f9f9f9"
                            >
                                <div
                                    class="u-row"
                                    style="
                                        margin: 0 auto;
                                        min-width: 320px;
                                        max-width: 600px;
                                        overflow-wrap: break-word;
                                        word-wrap: break-word;
                                        word-break: break-word;
                                        background-color: #f9f9f9;
                                    "
                                >
                                    <div
                                        style="
                                            border-collapse: collapse;
                                            display: table;
                                            width: 100%;
                                            height: 100%;
                                            background-color: transparent;
                                        "
                                    >
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                        <div
                                            class="u-col u-col-100"
                                            style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                            "
                                        >
                                            <div
                                                style="
                                                    height: 100%;
                                                    width: 100% !important;
                                                "
                                            >
                                                <!--[if (!mso)&(!IE)]><!--><div
                                                    style="
                                                        box-sizing: border-box;
                                                        height: 100%;
                                                        padding: 0px;
                                                        border-top: 0px solid
                                                            transparent;
                                                        border-left: 0px solid
                                                            transparent;
                                                        border-right: 0px solid
                                                            transparent;
                                                        border-bottom: 0px solid
                                                            transparent;
                                                    "
                                                ><!--<![endif]-->
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 15px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <table
                                                                        height="0px"
                                                                        align="center"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        width="100%"
                                                                        style="
                                                                            border-collapse: collapse;
                                                                            table-layout: fixed;
                                                                            border-spacing: 0;
                                                                            mso-table-lspace: 0pt;
                                                                            mso-table-rspace: 0pt;
                                                                            vertical-align: top;
                                                                            border-top: 1px
                                                                                solid
                                                                                #f9f9f9;
                                                                            -ms-text-size-adjust: 100%;
                                                                            -webkit-text-size-adjust: 100%;
                                                                        "
                                                                    >
                                                                        <tbody>
                                                                            <tr
                                                                                style="
                                                                                    vertical-align: top;
                                                                                "
                                                                            >
                                                                                <td
                                                                                    style="
                                                                                        word-break: break-word;
                                                                                        border-collapse: collapse !important;
                                                                                        vertical-align: top;
                                                                                        font-size: 0px;
                                                                                        line-height: 0px;
                                                                                        mso-line-height-rule: exactly;
                                                                                        -ms-text-size-adjust: 100%;
                                                                                        -webkit-text-size-adjust: 100%;
                                                                                    "
                                                                                >
                                                                                    <span
                                                                                        >&#160;</span
                                                                                    >
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
    
                            <div
                                class="u-row-container"
                                style="padding: 0px; background-color: transparent"
                            >
                                <div
                                    class="u-row"
                                    style="
                                        margin: 0 auto;
                                        min-width: 320px;
                                        max-width: 600px;
                                        overflow-wrap: break-word;
                                        word-wrap: break-word;
                                        word-break: break-word;
                                        background-color: #ffffff;
                                    "
                                >
                                    <div
                                        style="
                                            border-collapse: collapse;
                                            display: table;
                                            width: 100%;
                                            height: 100%;
                                            background-color: transparent;
                                        "
                                    >
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                        <div
                                            class="u-col u-col-100"
                                            style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                            "
                                        >
                                            <div
                                                style="
                                                    height: 100%;
                                                    width: 100% !important;
                                                "
                                            >
                                                <!--[if (!mso)&(!IE)]><!--><div
                                                    style="
                                                        box-sizing: border-box;
                                                        height: 100%;
                                                        padding: 0px;
                                                        border-top: 0px solid
                                                            transparent;
                                                        border-left: 0px solid
                                                            transparent;
                                                        border-right: 0px solid
                                                            transparent;
                                                        border-bottom: 0px solid
                                                            transparent;
                                                    "
                                                ><!--<![endif]-->
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 25px
                                                                            10px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <table
                                                                        width="100%"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        border="0"
                                                                    >
                                                                        <tr>
                                                                            <td
                                                                                style="
                                                                                    padding-right: 0px;
                                                                                    padding-left: 0px;
                                                                                "
                                                                                align="center"
                                                                            >
                                                                                <img
                                                                                    align="center"
                                                                                    border="0"
                                                                                    src="https://res.cloudinary.com/mehedi08h/image/upload/v1694624850/genius/image-2_scgplh.png"
                                                                                    alt="Genius"
                                                                                    title="Genius"
                                                                                    style="
                                                                                        outline: none;
                                                                                        text-decoration: none;
                                                                                        -ms-interpolation-mode: bicubic;
                                                                                        clear: both;
                                                                                        display: inline-block !important;
                                                                                        border: none;
                                                                                        height: auto;
                                                                                        float: none;
                                                                                        width: 9%;
                                                                                        max-width: 52.2px;
                                                                                    "
                                                                                    width="52.2"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
    
                            <div
                                class="u-row-container"
                                style="padding: 0px; background-color: transparent"
                            >
                                <div
                                    class="u-row"
                                    style="
                                        margin: 0 auto;
                                        min-width: 320px;
                                        max-width: 600px;
                                        overflow-wrap: break-word;
                                        word-wrap: break-word;
                                        word-break: break-word;
                                        background-color: #161a39;
                                    "
                                >
                                    <div
                                        style="
                                            border-collapse: collapse;
                                            display: table;
                                            width: 100%;
                                            height: 100%;
                                            background-color: transparent;
                                        "
                                    >
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                        <div
                                            class="u-col u-col-100"
                                            style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                            "
                                        >
                                            <div
                                                style="
                                                    height: 100%;
                                                    width: 100% !important;
                                                "
                                            >
                                                <!--[if (!mso)&(!IE)]><!--><div
                                                    style="
                                                        box-sizing: border-box;
                                                        height: 100%;
                                                        padding: 0px;
                                                        border-top: 0px solid
                                                            transparent;
                                                        border-left: 0px solid
                                                            transparent;
                                                        border-right: 0px solid
                                                            transparent;
                                                        border-bottom: 0px solid
                                                            transparent;
                                                    "
                                                ><!--<![endif]-->
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 35px
                                                                            10px
                                                                            10px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <table
                                                                        width="100%"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        border="0"
                                                                    >
                                                                        <tr>
                                                                            <td
                                                                                style="
                                                                                    padding-right: 0px;
                                                                                    padding-left: 0px;
                                                                                "
                                                                                align="center"
                                                                            >
                                                                                <img
                                                                                    align="center"
                                                                                    border="0"
                                                                                    src="https://res.cloudinary.com/mehedi08h/image/upload/v1694624850/genius/image-1_kwoks5.png"
                                                                                    alt="Image"
                                                                                    title="Image"
                                                                                    style="
                                                                                        outline: none;
                                                                                        text-decoration: none;
                                                                                        -ms-interpolation-mode: bicubic;
                                                                                        clear: both;
                                                                                        display: inline-block !important;
                                                                                        border: none;
                                                                                        height: auto;
                                                                                        float: none;
                                                                                        width: 6%;
                                                                                        max-width: 34.8px;
                                                                                    "
                                                                                    width="34.8"
                                                                                />
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 0px
                                                                            10px
                                                                            30px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <div
                                                                        style="
                                                                            font-size: 14px;
                                                                            line-height: 140%;
                                                                            text-align: left;
                                                                            word-wrap: break-word;
                                                                        "
                                                                    >
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                                text-align: center;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    font-size: 22px;
                                                                                    line-height: 30.8px;
                                                                                    color: #ffffff;
                                                                                    font-family: Ubuntu;
                                                                                "
                                                                                >Please
                                                                                reset
                                                                                your
                                                                                password
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
    
                            <div
                                class="u-row-container"
                                style="padding: 0px; background-color: transparent"
                            >
                                <div
                                    class="u-row"
                                    style="
                                        margin: 0 auto;
                                        min-width: 320px;
                                        max-width: 600px;
                                        overflow-wrap: break-word;
                                        word-wrap: break-word;
                                        word-break: break-word;
                                        background-color: #ffffff;
                                    "
                                >
                                    <div
                                        style="
                                            border-collapse: collapse;
                                            display: table;
                                            width: 100%;
                                            height: 100%;
                                            background-color: transparent;
                                        "
                                    >
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                        <div
                                            class="u-col u-col-100"
                                            style="
                                                max-width: 320px;
                                                min-width: 600px;
                                                display: table-cell;
                                                vertical-align: top;
                                            "
                                        >
                                            <div
                                                style="
                                                    height: 100%;
                                                    width: 100% !important;
                                                "
                                            >
                                                <!--[if (!mso)&(!IE)]><!--><div
                                                    style="
                                                        box-sizing: border-box;
                                                        height: 100%;
                                                        padding: 0px;
                                                        border-top: 0px solid
                                                            transparent;
                                                        border-left: 0px solid
                                                            transparent;
                                                        border-right: 0px solid
                                                            transparent;
                                                        border-bottom: 0px solid
                                                            transparent;
                                                    "
                                                ><!--<![endif]-->
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 40px
                                                                            40px
                                                                            30px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <div
                                                                        style="
                                                                            font-size: 14px;
                                                                            line-height: 140%;
                                                                            text-align: left;
                                                                            word-wrap: break-word;
                                                                        "
                                                                    >
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    font-size: 16px;
                                                                                    line-height: 22.4px;
                                                                                    color: #000000;
                                                                                    font-family: Ubuntu;
                                                                                "
                                                                                >Hello ${firstName},</span
                                                                            >
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                             
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    color: #000000;
                                                                                    line-height: 22.4px;
                                                                                    font-family: Ubuntu;
                                                                                    font-size: 16px;
                                                                                "
                                                                                >You
                                                                                recently
                                                                                requested
                                                                                to
                                                                                reset
                                                                                the
                                                                                password
                                                                                for
                                                                                your
                                                                                Genius
                                                                                account.
                                                                                <span
                                                                                    style="
                                                                                        line-height: 19.6px;
                                                                                    "
                                                                                    >We
                                                                                    have
                                                                                    sent
                                                                                    you
                                                                                    this
                                                                                    email
                                                                                    in
                                                                                    response
                                                                                    to
                                                                                    your
                                                                                    request
                                                                                    to
                                                                                    reset
                                                                                    your
                                                                                    password
                                                                                    on
                                                                                    Genius</span
                                                                                ></span
                                                                            >
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                             
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    font-size: 16px;
                                                                                    line-height: 22.4px;
                                                                                    color: #000000;
                                                                                    font-family: Ubuntu;
                                                                                "
                                                                                >To
                                                                                reset
                                                                                your
                                                                                password,
                                                                                please
                                                                                follow
                                                                                the
                                                                                link
                                                                                below</span
                                                                            >
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 0px
                                                                            40px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <!-- reset password -->
                                                                    <!--[if mso
                                                                        ]><style>
                                                                            .v-button {
                                                                                background: transparent !important;
                                                                            }
                                                                        </style><!
                                                                    [endif]-->
                                                                    <div
                                                                        align="left"
                                                                    >
                                                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:52px; v-text-anchor:middle; width:221px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                        <a
                                                                            href=${link}
                                                                            target="_blank"
                                                                            class="v-button"
                                                                            style="
                                                                                box-sizing: border-box;
                                                                                cursor: pointer;
                                                                                display: inline-block;
                                                                                text-decoration: none;
                                                                                -webkit-text-size-adjust: none;
                                                                                text-align: center;
                                                                                color: #ffffff;
                                                                                background-color: #18163a;
                                                                                border-radius: 1px;
                                                                                -webkit-border-radius: 1px;
                                                                                -moz-border-radius: 1px;
                                                                                width: auto;
                                                                                max-width: 100%;
                                                                                overflow-wrap: break-word;
                                                                                word-break: break-word;
                                                                                word-wrap: break-word;
                                                                                mso-border-alt: none;
                                                                                border-top-width: 0px;
                                                                                border-top-style: dotted;
                                                                                border-top-color: #ccc;
                                                                                border-left-width: 0px;
                                                                                border-left-style: dotted;
                                                                                border-left-color: #ccc;
                                                                                border-right-width: 0px;
                                                                                border-right-style: dotted;
                                                                                border-right-color: #ccc;
                                                                                border-bottom-width: 0px;
                                                                                border-bottom-style: dotted;
                                                                                border-bottom-color: #ccc;
                                                                                font-size: 14px;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    display: block;
                                                                                    padding: 15px
                                                                                        40px;
                                                                                    line-height: 120%;
                                                                                "
                                                                                ><span
                                                                                    style="
                                                                                        font-size: 18px;
                                                                                        line-height: 21.6px;
                                                                                        font-family: verdana,
                                                                                            geneva;
                                                                                    "
                                                                                    >Reset
                                                                                    Password</span
                                                                                ></span
                                                                            >
                                                                        </a>
                                                                        <!--[if mso]></center></v:roundrect><![endif]-->
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 28px
                                                                            40px 9px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <div
                                                                        style="
                                                                            font-size: 14px;
                                                                            line-height: 140%;
                                                                            text-align: left;
                                                                            word-wrap: break-word;
                                                                        "
                                                                    >
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    font-size: 16px;
                                                                                    line-height: 22.4px;
                                                                                "
                                                                                ><em
                                                                                    >If
                                                                                    you
                                                                                    did
                                                                                    not
                                                                                    request
                                                                                    a
                                                                                    password
                                                                                    reset,
                                                                                    please
                                                                                    ignore
                                                                                    this
                                                                                    email
                                                                                    or
                                                                                    reply
                                                                                    to
                                                                                    let
                                                                                    us
                                                                                    know.
                                                                                    This
                                                                                    password
                                                                                    reset
                                                                                    link
                                                                                    is
                                                                                    only
                                                                                    valid
                                                                                    for
                                                                                    the
                                                                                    next
                                                                                    10
                                                                                    minutes. </em
                                                                                ></span
                                                                            >
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <table
                                                        style="
                                                            font-family: 'Lato',
                                                                sans-serif;
                                                        "
                                                        role="presentation"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        width="100%"
                                                        border="0"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style="
                                                                        overflow-wrap: break-word;
                                                                        word-break: break-word;
                                                                        padding: 19px
                                                                            40px
                                                                            14px;
                                                                        font-family: 'Lato',
                                                                            sans-serif;
                                                                    "
                                                                    align="left"
                                                                >
                                                                    <div
                                                                        style="
                                                                            font-size: 14px;
                                                                            line-height: 140%;
                                                                            text-align: left;
                                                                            word-wrap: break-word;
                                                                        "
                                                                    >
                                                                        <p
                                                                            style="
                                                                                font-size: 14px;
                                                                                line-height: 140%;
                                                                            "
                                                                        >
                                                                            <span
                                                                                style="
                                                                                    color: #b0b4bb;
                                                                                    font-family: monospace;
                                                                                    font-size: 16px;
                                                                                    white-space: normal;
                                                                                    background-color: #fafafa;
                                                                                    float: none;
                                                                                    display: inline;
                                                                                    line-height: 22.4px;
                                                                                "
                                                                                >Thanks,
                                                                                the
                                                                                genius
                                                                                team</span
                                                                            > <br /><span
                                                                                style="
                                                                                    color: #888888;
                                                                                    font-size: 14px;
                                                                                    line-height: 19.6px;
                                                                                "
                                                                                ><em
                                                                                    ><span
                                                                                        style="
                                                                                            font-size: 16px;
                                                                                            line-height: 22.4px;
                                                                                        "
                                                                                        > </span
                                                                                    ></em
                                                                                ></span
                                                                            >
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
    
                                                    <!-- [if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif] -->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
    
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
        </body>
    </html>
    `;

    return {
        message: message,
    };
};
