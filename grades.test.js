const { readXML, readDOM } = require('./grades')
const { getByText } = require('@testing-library/dom')

describe('XML', () => {
    const xml = readXML()
    const { heroe } = xml

    test('nombre', () => {
        expect(heroe.nombre.toLowerCase().trimEnd()).toBe('batman');
    })
    test('direccion', () => {
        expect(heroe.identidadSecreta.nombre.toLowerCase().trimEnd()).toBe('bruce');
        expect(heroe.identidadSecreta.apellidos.toLowerCase().trimEnd()).toBe('wayne');
    })
    test('poderes', () => {
        expect(heroe.poderes.poder.length).toBe(3)
    })
})



describe('HTML', () => {
    const document = readDOM().document

    test('html:title', () => {
        const title = document.querySelector('title')
        expect(title.textContent).toBe('UT1: LLMM')
    })
    test('html:h1', () => {
        const h1 = document.querySelector('h1')
        expect(h1.textContent.trimEnd()).toBe('UT1: Examen de Lenguajes de marcas')
    })
    test('html:p', () => {
        const p = document.querySelector('p')
        expect(p.textContent.trimEnd()).toBe('Este es el examen de la unidad 1 del módulo de desarrollo web en entorno cliente')
    })

    test('html:form', () => {
        const inputs = document.querySelectorAll('form>input')
        const labels = document.querySelectorAll('form>label')
        const button = document.querySelector('form>button')
        expect(inputs[0].getAttribute('id')).toBe(labels[0].getAttribute('for'))
        expect(inputs[0].getAttribute('type')).toBe('text')

        expect(inputs[1].getAttribute('id')).toBe(labels[1].getAttribute('for'))
        expect(inputs[1].getAttribute('type')).toBe('email')

        expect(inputs[2].getAttribute('id')).toBe(labels[2].getAttribute('for'))
        expect(inputs[3].getAttribute('id')).toBe(labels[3].getAttribute('for'))
        expect(inputs[4].getAttribute('id')).toBe(labels[4].getAttribute('for'))
        expect(inputs[2].getAttribute('type')).toBe('radio')
        expect(inputs[3].getAttribute('type')).toBe('radio')
        expect(inputs[4].getAttribute('type')).toBe('radio')
        const name = inputs[2].getAttribute('name')
        expect(inputs[2].getAttribute('name')).toBe(name)
        expect(inputs[3].getAttribute('name')).toBe(name)
        expect(inputs[4].getAttribute('name')).toBe(name)
    })

    test('html:table', () => {
        const tr = document.querySelectorAll('tr')
        const td = document.querySelectorAll('td')
        const rowspan = td[1].attributes.getNamedItem('rowspan')?.textContent ?? null
        const colspan = td[0].attributes.getNamedItem('colspan')?.textContent ?? null
        expect(tr.length).toBe(4)
        expect(td.length).toBe(5)
        expect(rowspan).toBe('3')
        expect(colspan).toBe('2')
    })
})

describe('CSS', () => {
    const window = readDOM()
    const document = window.document

    const td = document.querySelectorAll('td')
    test('css:table1', () => {
        const td4 = td[2]
        const td8 = td[4]
        const computedTd4 = window.getComputedStyle(td4)
        const computedTd8 = window.getComputedStyle(td8)


        // expect(computedTd4.backgroundColor).toBe('rgb(118, 186, 138)')
        // expect(computedTd8.backgroundColor).toBe('rgb(118, 186, 138)')
        expect(td8.classList).toContain(td4.className)
    })
    test('css:table2', () => {
        const td3 = td[1]
        const td8 = td[4]
        const computedTd3 = window.getComputedStyle(td3)
        const computedTd8 = window.getComputedStyle(td8)

        // expect(computedTd3.color).toBe('rgb(108, 26, 230)')
        // expect(computedTd8.color).toBe('rgb(108, 26, 230)')
        expect(td8.classList).toContain(td3.className)
        // expect(td3.id).not.toBe(td8.id)
    })
    test('css:form', () => {
        const button = document.querySelector('form>button')
        const computedStyle = window.getComputedStyle(button)
        // console.log(h1)
        expect(computedStyle.paddingBottom).toBe('8px')
        expect(computedStyle.paddingTop).toBe('8px')
        expect(computedStyle.paddingLeft).toBe('12px')
        expect(computedStyle.paddingRight).toBe('12px')
        expect(computedStyle.backgroundColor).toBe('rgb(118, 186, 138)')
        expect(computedStyle.borderWidth).toContain('2px')
        expect(computedStyle.borderStyle).toContain('solid')
    })

})