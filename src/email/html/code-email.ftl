<#import "template.ftl" as layout>
<@layout.emailLayout>
${kcSanitize(msg("emailCodeBodyText", ttl, code, "kundesenter@bob.no"))?no_esc}
<#--  <div>
    <p>${kcSanitize(msg("emailCodeMessage", ttl))?no_esc}</p>
    <br />
    <br />
    <p>${kcSanitize(msg("emailCode", code))?no_esc}</p>
    <br />
    <p>${kcSanitize(msg("autoMessage"))?no_esc}</p>
    <br />
    <p>${kcSanitize(msg("contactMessage", "kundesenter@bob.no"))?no_esc}</p>
</div>  -->
</@layout.emailLayout>
