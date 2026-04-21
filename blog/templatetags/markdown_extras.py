from django import template
from django.template.defaultfilters import stringfilter
from django.utils.safestring import mark_safe
import markdown

register = template.Library()

@register.filter
@stringfilter
def markdownify(content):
    if not content:
        return ''
    md = markdown.Markdown(
        extensions=['extra', 'codehilite', 'fenced_code', 'tables', 'nl2br', 'md_in_html'],
        extension_config={
            'codehilite_theme': 'monokai',
        }
    )
    html = md.convert(content)
    return mark_safe(html)