import configparser
from configparser import RawConfigParser
import sys
from pathlib import Path

DEFAULT_SECTION = "default"
IGNORE_SECTION = [DEFAULT_SECTION]

FORM_TEMPLATE = Path('config/form.html').read_text()


def buildField(config: RawConfigParser, fieldName: str):
    print("Building " + fieldName)
    template: str = Path(
        config[fieldName]['templateFile']).read_text().split("\n", 1)
    properties = template[0]
    template = template[1]

    for settingKey in properties.split(','):
        value = ''
        if settingKey in config[fieldName].keys():
            value = config[fieldName][settingKey]
        elif settingKey in config[DEFAULT_SECTION]:
            value = config[DEFAULT_SECTION][settingKey]
        else:
            raise Exception(
                "Missing key [" + fieldName + "][" + settingKey + "]")

        print(settingKey + " => " + value)

        token = "__[" + settingKey + "]__"
        template = template.replace(token, value)
    return template


def buildForm(config: RawConfigParser, formTemplate: str, formProps: list):
    for formProp in formProps:
        value = ''
        if formProp in config[DEFAULT_SECTION]:
            value = config[DEFAULT_SECTION][formProp]
        else:
            raise Exception(
                "Missing key [" + DEFAULT_SECTION + "][" + formProp + "]")

        print(formProp + " => " + value)

        token = "__[" + formProp + "]__"
        formTemplate = formTemplate.replace(token, value)

    return formTemplate


if __name__ == "__main__":
    if len(sys.argv) < 2:
        exit()

    propFile = sys.argv[1]

    config = configparser.RawConfigParser()
    config.read(propFile)

    fields = []
    for section in config.sections():
        if (section in IGNORE_SECTION):
            continue
        fields.append(section)

    formText = ""
    for field in fields:
        formText += buildField(config, field) + "\n"

    formTemplate = FORM_TEMPLATE.split('\n', 1)
    formTemplate = buildForm(
        config, formTemplate[1], formTemplate[0].split(','))
    formTemplate = formTemplate.replace("</CONTENT>", formText)

    Path(propFile + '.out.html').write_text(formTemplate)
