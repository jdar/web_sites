// URL: https://beta.observablehq.com/@despiegk/federal-budget-in-a-bottle
// Title: Federal Budget in a Bottle
// Author: kristof de spiegeleer (@despiegk)
// Version: 2533
// Runtime version: 1

const m0 = {
    id: "fd5ed121d2178bac@2533",
    variables: [
      {
        inputs: ["md"],
        value: (function(md){return(
  md`# Federal Budget in a Bottle`
  )})
      },
      {
        inputs: ["html"],
        value: (function(html){return(
  html`
  <p>
      The US federal budget. It absorbs a good chunk of our income, it is supposed to represent our values and serve our needs, and if you go to the publicly-available sources,
      <a href="https://www.cbo.gov/system/files/115th-congress-2017-2018/costestimate/rcp115-66consolidatedappropsact2018.pdf">it is all kinds of inscrutable</a>. Of all its mysteries, at least one should somewhat workable: <strong>the numbers are ridiculously large.</strong> 
  </p>
  
  <p>
  It is difficult to figure costs and benefits when the numbers are so far beyond everyday experience as to have no meaning. $1.3 trillion. $48 billion. Uh-huh, ok. <a href="http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html">Good visualizations</a> can help make sense of how the budget pie is cut, but the numbers themselves remain inaccessible. I'd like a more <i>visceral, everyday intution</i>.
  </p>
  
  <div style="height: 250px; position:relative; width: 100%; overflow:hidden; margin: 1.5em 0">
      <img src="http://misc.patternleaf.com/ohq/ship-in-a-bottle-sm.png" style="width:75%; position: absolute; top: -150px;"/ >
  </div>
  
  <p style="background-color: #efefef; padding: 1em; font-size: 0.75em">
      Sources & Disclaimers: the numbers in this notebook come from the <a href="https://www.whitehouse.gov/omb/historical-tables/">White House Office of Management and Budget</a>. Specifically tables <a href="https://www.whitehouse.gov/wp-content/uploads/2018/02/hist08z5-fy2019.xlsx">8.5</a>, <a href="https://www.whitehouse.gov/wp-content/uploads/2018/02/hist08z7-fy2019.xlsx">8.7</a>, and <a href="https://www.whitehouse.gov/wp-content/uploads/2018/02/hist03z2-fy2019.xlsx">3.2</a>, and ignoring offsetting receipts. Whatever those are. I am clearly not an expert and have no idea if this is really a complete picture of the budget. While the broad trends presented here seem to align <a href="https://www.cbo.gov/publication/53623">with</a> <a href="https://www.nationalpriorities.org/budget-basics/federal-budget-101/spending/">other</a> <a href="https://en.wikipedia.org/wiki/File:CBO_Infographic_2016.png">sources</a>,
      please take all this with a grain of salt!
  </p>
  `
  )})
      },
      {
        inputs: ["number","state","d3","arrayedData","styles","estimateStartYear","html","DOM"],
        value: (function(number,state,d3,arrayedData,styles,estimateStartYear,html,DOM)
  {
    const stateId = 'scaleBudgetInput'
    const inputWrapper = number({ 
      // placeholder: 'For example, your monthly budget',
      title: 'What If the Budget Were Only',
      description: 'The median US household monthly income was $5919 in 2016.',
      style: 'display: inline-block',
      min: 1
    })
    const input = inputWrapper.querySelector('input')
    input.addEventListener('change', event => { 
      state.set('scaleBudget', stateId, parseFloat(event.target.value))
    })
    input.value = state.scaleBudget
    state.on('scaleBudget', stateId, newValue => {
      input.value = newValue
    })
    d3.select(inputWrapper).select('.bucks').remove()
    d3.select(inputWrapper).insert('span', 'input').text('$')
      .style('display', 'inline-block')
      .style('font-family', 'sans-serif')
      .style('padding', '0 0.25em 0 0')
      .style('vertical-align', '-.12em')
  
  
    const generate = () => {
      let amt = state.selectedCategory.data.outlays[state.selectedYearIndex]
      const selectedProgramName = state.selectedCategory.data.name
      const selectedProgramAmt = d3.format('$,')(state.selectedCategory.data.outlays[state.selectedYearIndex])
      const amtFactor = (amt / arrayedData.totals[state.selectedYearIndex])
      const scaledAmt = styles('formatter').dollarsSmall((state.scaleBudget * amtFactor))
      const perDayAmt = styles('formatter').dollarsSmall((state.scaleBudget * amtFactor / 30))
      const highlightStyleLow = styles('highlightTextLow')
      const highlightStyle = styles('highlightText')
      const verb = state.selectedYear > estimateStartYear ? 'will cost' : 'cost'
      
      return html`
  <p>
      So, let's shrink it. <strong>Let's pretend the annual federal budget is the amount
      you, personally, budget for yourself in a month</strong>. (You can of course use any number you want here.)
  </p>
      <div style="font-size: 2em; padding: 0.5em 0">${inputWrapper}</div>
  <p style="height:4.5em">
      In this imaginary budget, <span style="${highlightStyleLow}">${selectedProgramName}</span>, for example, ${verb} the government about <span style="${highlightStyle}">${scaledAmt}</span> in ${state.selectedYear}. Scaled down to your month's budget, that's about <span style="${highlightStyle}">${perDayAmt} a day</span>.
  </p>
  <p>
      To be clear, this is <strong>not</strong> what that program ${verb} you or any other specific tax payer.
      It's what it would cost the federal government if its annual budget were 
      shrunk to the size and timeframe of your monthly budget. The question of where that money comes from
      to begin with (revenue) is completely different.
  </p>
  <p>
      OK, so: ${perDayAmt} a day is pretty relatable. How does this compare to spending on 
      other programs? How has this spending changed over time?
  </p>
  <p>To the charts!</p>
  `
    }
    const container = d3.select(DOM.element('div'))
    container.node().appendChild(generate())
    const dependencies = ['selectedYearIndex', 'selectedCategory', 'selectedYearIndex', 'scaleBudget']
    // todo: debounce these per event loop
    dependencies.forEach(name => state.on(name, 'nonsetting', newValue => {
      container.select('div').remove()
      container.node().appendChild(generate())
    }))
    return container.node()
  }
  )
      },
      {
        inputs: ["state","arrayedData","styles","estimateStartYear","treeData","d3","DOM","html","treemap"],
        value: (function(state,arrayedData,styles,estimateStartYear,treeData,d3,DOM,html,treemap)
  { 
    const stateId = 'treemapCaption'
    const generateCaption = () => {
      let caption = "Click to select a category."
      const currentLeaves = state.selectedTreeRoot.leaves()
      if (state.selectedCategory) {
        if (state.useScaleBudget) {
          const selectedYearIndex = arrayedData.years.indexOf(state.selectedYear)
          const yearTotal = arrayedData.totals[selectedYearIndex]
          caption = `${state.selectedCategory.data.name}: ${styles('formatter').dollarsSmall(state.selectedCategory.value / yearTotal * state.scaleBudget )}`
        }
        else {
          caption = `${state.selectedCategory.data.name}: ${styles('formatter').dollarsBig(state.selectedCategory.value * 1000000)}`
        } 
      }
      return caption
    }
    
    const generateTitle = () => {
      return `Federal Budget ${state.selectedYear >= estimateStartYear ? '(Projected)' : ''} in ${state.selectedYear}`
    }
    
    const generateSubtitle = () => {
      return `${state.topLevelIndex < 0 ? "All Outlays" : treeData.children[state.topLevelIndex].name}`
    }
     
    const captionContainer = d3.select(DOM.element('div'))
        .classed('caption', true)
        .style('color', 'gray')
        .style('font-family', 'sans-serif')
        .style('font-size', '.8em')
    captionContainer.text(generateCaption())
    
    const titleContainer = d3.select(DOM.element('h2'))
    titleContainer.text(generateTitle())
    
    const subtitleContainer = d3.select(DOM.element('h3'))
        .style('color', 'gray')
    subtitleContainer.text(generateSubtitle())
    
    const dependencies = [
      'selectedYear',
      'selectedTreeRoot',
      'topLevelIndex',
      'selectedCategory',
      'useScaleBudget'
    ]
    dependencies.forEach(name => {
      state.on(name, stateId, newValue => {
        captionContainer.text(generateCaption())
        titleContainer.text(generateTitle())
        subtitleContainer.text(generateSubtitle())
      })
    })
    
    return html`
  <div style="font-family: sans-serif;">
    ${titleContainer.node()}
    ${subtitleContainer.node()}
    </div>
    <div style="margin-top:0.5em">
      ${treemap.node()}
    </div>
    ${captionContainer.node()}
  </div>
  `
  }
  )
      },
      {
        inputs: ["d3","DOM","yearSlider","state","tlcPicker","useScaleBudgetSwitch","html"],
        value: (function(d3,DOM,yearSlider,state,tlcPicker,useScaleBudgetSwitch,html)
  {
    const sliderStateId = 'treemapYearSlider'
    const sliderContainer = d3.select(DOM.element('div')).style('padding',  '0 1em 0 0')
    sliderContainer.node().appendChild(yearSlider(sliderStateId))
    // the range input seems to have some serious redraw issues.
    // easier to just re-create it on value changes.
    state.on('selectedYear', sliderStateId, newValue => {
      sliderContainer.select('form').remove()
      sliderContainer.node().appendChild(yearSlider(sliderStateId))
    })
    
    const catPicker = tlcPicker('treemapTLCPicker')
    const scaleBudgetSwitch = useScaleBudgetSwitch('treemapBudgetSwitch')
    
    const form = html`
  <form>
      <p><em style="color:gray">These controls affect all data displays in the notebook.</em></p>
      <div style="display: flex; justify-content: space-between;">
          ${sliderContainer.node()}
            <div style="padding: 0 0 0 1em">
            ${catPicker}
          </div>
          <div style="padding: 0 0 0 1em">
            ${scaleBudgetSwitch}
          </div>
      </div>
      
  </form>`;
    
    return form;
  }
  )
      },
      {
        inputs: ["relativeChart","arrayedData","width","state","d3","styles","html","estimateStartYear","DOM","categoryList","_"],
        value: (function(relativeChart,arrayedData,width,state,d3,styles,html,estimateStartYear,DOM,categoryList,_)
  {
  
    const stateId = 'relativeChartOverlay'  
    
    // TODO: transition these instead of regenerating 
    // with new style
    const getOverlayStyle = (yearIndex) => {
      const config = relativeChart.chartConfig
      let hPosition = `left: ${config.margin.left + 10}px`
      let textAlign = 'text-align: left'
      if (yearIndex < arrayedData.years.length / 2) {
        hPosition = `right: ${(width * 0.25) + config.margin.right}px`
        textAlign = 'text-align: right'
      }
      return {
        hPosition,
        textAlign
      }
    }
    
    const generateOverlay = () => {
      const config = relativeChart.chartConfig
      const yearIndex = state.selectedYearIndex
      const categoryName = state.selectedCategory.data.name
      let amt = state.selectedCategory.data.outlays[yearIndex]
      const categoryParents = state.selectedCategory.data.parents.join(' / ')
      const amtFactor = (amt / arrayedData.totals[yearIndex])
      const percentage = d3.format('.1%')(amtFactor.toPrecision(2))
      const scaledAmt = d3.format('$,.2f')((state.scaleBudget * amtFactor))
      const highlightColor = styles('highlightColor')
      const highlightColorLow = styles('highlightColorLow')
      
      let overlayStyle = getOverlayStyle(yearIndex)
  
      amt = d3.format('$,')(amt * 1000000)
      
      let scaledOverlay = html``
      if (state.useScaleBudget) {
        scaledOverlay = html`
  <div class="scaled-overlay" style="position:absolute; ${overlayStyle.hPosition}; top: ${config.height * 0.3}px; font-family: sans-serif; background: rgba(255, 255, 255, 0.7); padding: 5px;">
    <h3 style="color: gray; ${overlayStyle.textAlign}">
        That'd be<br/>
        <span style="color: ${highlightColor}; font-size: 1.6em">${scaledAmt}</span><br/>
        in a budget of ${styles('formatter').dollarsSmall(state.scaleBudget)}.
    </h3>
  </div>
  `
      }
  
      return html`
  <div class="overlay">
    <div style="position:absolute; ${overlayStyle.hPosition}; top: ${config.margin.top * 2}px; background: rgba(255, 255, 255, 0.7); padding: 5px;">
      <h3 style="color: gray; ${overlayStyle.textAlign}">
          In ${state.selectedYear}, the federal government
          ${state.selectedYear >= estimateStartYear ? 'is projected to spend' : 'spent'} 
          <div><span style="color: ${highlightColorLow}; font-size: 1.3em">${amt}</span> on</div>
          <span style="color: black">${categoryName}</span>.
      </h3>
      <div style="font-size:0.75em; font-family: sans-serif; display: none;">
          <div>${categoryParents}</div>
      </div>
    </div>
    ${scaledOverlay}
  </div>
  `        
    }
     
    const catListContainer = d3.select(DOM.element('div'))
    catListContainer
      .style('overflow-y', 'scroll')
        .style('height', `${relativeChart.chartConfig.height}px`)
    
    catListContainer.node().appendChild(categoryList.node())
    const overlayContainer = d3.select(DOM.element('div'))
    
    const dependencies = [
      'selectedYear',
      'selectedYearIndex',
      'selectedCategory',
      'useScaleBudget',
      'scaleBudget'
    ]
    dependencies.forEach(name => {
      state.on(name, stateId, (newValue, oldValue) => {
        overlayContainer.select('.overlay').remove()
        overlayContainer.node().appendChild(generateOverlay())
      })
    })
    
    overlayContainer.node().appendChild(generateOverlay())
      
    return html`
  <h2>Federal Budget From ${_.first(arrayedData.years)} to ${_.last(arrayedData.years)}</h2>
  <div style="position:relative;">
    ${overlayContainer.node()}
    <div style="display: flex">
      <div>
        ${relativeChart.node()}
      </div>
      ${catListContainer.node()}
    </div>
  </div>
  `
  }
  )
      },
      {
        inputs: ["html","_","topLevelHierarchies","state"],
        value: (function(html,_,topLevelHierarchies,state)
  {
    const markup = html`
  <p>
      It's interesting to see long-term trends, both in absolute numbers and when framed as a 
      percentage of the total budget. For example, <a class="category-setter" data-category-search="Social Security" href="#">Social Security</a>, <a class="category-setter" data-category-search="Medicare" href="#">Medicare</a>, and <a class="category-setter" data-category-search="DoD" href="#">Defense</a> have always been 
      big line items, but defense costs have gradually decreased (relatively), while 
      Social Security and Health-related programs are starting to dominate.
  </p>
  <p>
      I made this notebook because <a href="https://www.cbo.gov/publication/43173">SNAP (formerly food stamps)</a> and <a href="http://nymag.com/daily/intelligencer/2017/03/white-house-says-cutting-meals-on-wheels-is-compassionate.html">other food assistance programs</a>
      have been recently (re-)targeted for budget cuts. <a href="https://www.washingtonpost.com/graphics/politics/trump-budget-benefits-cuts/">Cutting 
      SNAP will save billions of dollars over 10 years</a>. Ok. Is that a lot? It sounds like a lot. 
      Or maybe 10 billion is a pretty good value, if it's true that 
      "<a href="http://econofact.org/in-battle-over-2018-farm-bill-anti-poverty-program-at-stake">assistance from SNAP contributes to lifting 4.6 million individuals out of 
      poverty, including 2 million children.</a>" Maybe? Maybe not?
  </p>
  <p>
      It turns out that federal outlays for "Food and Nutrition Assistance" programs would cost 
      in the neighborhood of 150 bucks a month if the average monthly household income were 
      running the country. It's not nothing, but it's also not a huge hardship.
  </p>
  <p>
      Not to put too fine a point on it: it's like the cost of a few nice meals out each month.
  </p>
  <p>
      (Again, where that money actually comes from or how much anyone personally pays in taxes to support these programs are different questions! Not to mention, of course, the question of whether the government should be involved in such endeavors to begin with ... all of that is a bit outside of the scope of this notebook.) 
  </p>
  <p style="padding-bottom: 2em; border-bottom: 1px solid #bbb;">
      PS: I <em>highly</em> recommend <a href="https://www.marketplace.org/topics/the-uncertain-hour-season-1">Season 1 of The Uncertain Hour</a> for a deep dive into poverty and welfare in the US.
  </p>
  
  `
      const setCategory = (search) => {
        const category = _.find(topLevelHierarchies[-1].leaves(), l => l.data.id.indexOf(search) !== -1)
        if (category) {
          state.set('selectedCategory', 'in_text_link', category)
        }
      }
  
      markup.querySelectorAll('.category-setter').forEach(anchor => {
        anchor.addEventListener('click', event => {
          setCategory(anchor.getAttribute('data-category-search'))
          event.preventDefault()
        })
    })
    
    return markup
  }
  )
      },
      {
        inputs: ["html"],
        value: (function(html){return(
  html`
  
  <p>
      <em>
          Speaking of <a href="https://en.wikiquote.org/wiki/John_Godfrey_Saxe">laws and sausages</a>, from here down are the entrails of this notebook. 
      </em>
  </p>
  <h4>@import</h4>
  <ul>
      <li><a href="https://beta.observablehq.com/@jashkenas/inputs">@jashkenas/inputs</a></li>
      <li><a href="https://d3js.org">d3</a></li>
      <li><a href="https://lodash.com">lodash</a></li>
      <li><a href="https://github.com">github</a></li>
  </ul>
  `
  )})
      },
      {
        name: "relativeChart",
        inputs: ["width","d3","DOM","arrayedData","state","chartConfig"],
        value: (function(width,d3,DOM,arrayedData,state,chartConfig)
  {
    const chartWidth = width * 0.75
    const chartHeight = 500
    const stateId = 'relativeChart'
    
    const generate = () => {
      const svg = d3.select(DOM.svg(chartWidth, chartHeight));
  
      let maxY = d3.max(arrayedData.items, d => {
        if (state.useScaleBudget && state.scaleBudget) {
          return d3.max(d.outlays.map((outlay, i) => (outlay / arrayedData.totals[i]) * state.scaleBudget))
        }
        else {
          return d3.max(d.outlays)
        }
      })
  
      const config = chartConfig({
        width: chartWidth,
        height: chartHeight,
        scaleBudget: state.useScaleBudget ? state.scaleBudget : null,
        svg: svg,
        maxY: maxY,
        margin: { left: state.useScaleBudget ? 40 : 60 }
      })
  
      svg.append("g").call(config.xAxis);
      svg.append("g").call(config.yAxis);
  
      const items = state.selectedTreeRoot.leaves().map(l => l.data)
      for (let i = 0; i < items.length; i++) {
        let d = items[i]
        config.appendPath(d, 'normal')
      }
  
      config.appendPath(state.selectedCategory.data, 'selected')
  
      svg.on('mouseenter', config.onMouseEnter)
      svg.on('mouseleave', config.onMouseLeave)
      svg.on('mousemove', config.onMouseMove)
      svg.on('click', config.onClick)
      svg.chartConfig = config
  
      return svg
    }
    
    const initialSvg = generate()
    const container = d3.select(DOM.element('div'))
    container.node().appendChild(initialSvg.node())
    container.chartConfig = initialSvg.chartConfig
    const dependencies = [
      'selectedYearIndex', 
      'useScaleBudget', 
      'scaleBudget',
      'topLevelIndex',
      'selectedCategory'
    ]
    dependencies.forEach(name => state.on(name, stateId, () => {
      container.select('svg').remove()
      const newSvg = generate()
      container.node().appendChild(newSvg.node())
      container.chartConfig = newSvg.chartConfig
    }))
    return container
  }
  )
      },
      {
        name: "chartConfig",
        inputs: ["width","d3","arrayedData","_","tlCategoryColors","styles","estimateStartYearIndex","state"],
        value: (function(width,d3,arrayedData,_,tlCategoryColors,styles,estimateStartYearIndex,state)
  {
    return (options) => {
      const chartWidth = options.width || width * 0.75
      const chartHeight = options.height || 500
      // let margin = { top: 20, right: 10, bottom: 30, left: 50 , ...(options.margin || {})}
      let margin = Object.assign({ top: 20, right: 10, bottom: 30, left: 50 }, (options.margin || {}))
      const scaleBudget = options.scaleBudget
      const svg = options.svg
      const maxY = options.maxY
      
      const x = d3.scaleTime().domain([
        new Date(`${arrayedData.years[0]}-01-01`), 
        new Date(`${_.last(arrayedData.years)}-01-01`)
      ]).range([margin.left, chartWidth - margin.right])
      
      const y = d3.scaleLinear()
        .domain([0, maxY]).nice()
        .range([chartHeight - margin.bottom, margin.top])
      
      const line = (indexOffset) => d3.line().defined(d => !isNaN(d))
        .x((d, i) => x(new Date(`${arrayedData.years[i + indexOffset]}-01-01`)))
        .y((d, i) => {
          if (scaleBudget) {
            const yearTotal = arrayedData.totals[i + indexOffset]
            return y(d * (scaleBudget / yearTotal))
          }
          else {
            return y(d)
          }
        })
  
      const yAxis = g => g.attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(d3.format('$,')))
        .call(g => g.select(".domain").remove())
        .call(g => {
          if (!scaleBudget) {
              g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text('Millions of Dollars, Unadjusted for Inflation')       
          }
          else {
            
          }
        })
      
      const xAxis = g => g.attr("transform", `translate(0,${chartHeight - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(chartWidth / 80).tickSizeOuter(0))
  
      const colorFn = baseColor => d3.interpolateRgb(baseColor, '#ddd')(0.7)
      
      const lineAttr = (path, d, state) => {
        let result = {
          'fill': 'none',
          'stroke': d.parents ? colorFn(tlCategoryColors[d.parents[0]]) : '#333',
          'stroke-width': 1,
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round'
        }
        switch (state) {
          case 'normal': 
            break;
          case 'highlight':
            result.stroke = 'steelblue'
            result['stroke-width'] = 3.0
            break;
          case 'selected':
            result.stroke = styles('highlightColorLow')
            result['stroke-width'] = 3.0
            break;
        }
        for (let name in result) {
          path.attr(name, result[name])
        }
        return path
      }
      
      let handleMouseOverPath, handleMouseOutPath, bindHandleClickPath
  
      const appendPath = (d, highlight, className) => {
        const beforeNow = [...d.outlays].splice(0, estimateStartYearIndex)
        const afterNow = [...d.outlays].splice(estimateStartYearIndex)
        lineAttr(svg.append("path").datum(beforeNow), d, highlight)
            .attr('class', className)
            .attr("d", line(0))
              // .on('mouseover', handleMouseOverPath)
              // .on('mouseout', handleMouseOutPath)
              // .on('click', bindHandleClickPath(d))
  
        lineAttr(svg.append("path").datum(afterNow), d, highlight)
            .attr('class', [className, 'estimated'].join(' '))
            .attr("stroke-dasharray", "0.5, 4")
            .attr("d", line(estimateStartYearIndex - 1))
              // .on('mouseover', handleMouseOverPath)
              // .on('mouseout', handleMouseOutPath)
              // .on('click', bindHandleClickPath(d))
      }
  /*
      handleMouseOverPath = function(d, path) {
        console.log('over', d)
        svg.select('.highlight-path').remove()
        appendPath(d, 'highlight', 'highlight-path')
      }
  
      handleMouseOutPath = function(d, path) {
        svg.select('.highlight-path').remove()
      }
  
      bindHandleClickPath = (category) => (d) => {
        setSelectedCategoryId(d.id)
      }
   */
      const yearWidth = (width - margin.left - margin.right) / arrayedData.years.length
      const yearHeight = chartHeight - margin.bottom - margin.top
      const yearRectDimensions = year => {
        const isInRange = year >= arrayedData.years[0] && year <= _.last(arrayedData.years)
        return {
          x: isInRange ? x(new Date(`${year}-01-01`)) - (yearWidth / 2) : -100,
          y: margin.top,
          width: yearWidth,
          height: yearHeight
        }
      }
      
      const stateId = 'relativeChart'
      
      const updateSelectedYear = (year) => {
        svg.select('.selected-year').remove()
        const fill = d3.interpolateRgb(styles('highlightColorLow'), '#fff')(0.8)
        const rect = svg.insert('rect').classed('selected-year', true)
          .attr('fill', fill)
        _.forOwn(yearRectDimensions(year), (value, key) => {
          rect.attr(key, value)
        })
      }
      
      state.on('selectedYear', stateId, newValue => updateSelectedYear(newValue))
  
      const highlightedYearRect = svg.insert('rect').classed('highlighted-year', true)
        .attr('stroke', styles('highlightColorLow'))
        .attr('stroke-dasharray', [2,5])
        .attr('fill', `rgba(0, 0, 0, 0)`)
        .attr('opacity', 0)
      
      const onMouseEnter = (event) => {
        svg.select('.highlighted-year').attr('opacity', 1)
      }
        const onMouseLeave = (event) => {
        svg.select('.highlighted-year').attr('opacity', 0)
        // svg.select('.highlight-path').remove()
      }
      
      const xToYear = (x) => {
        const amt = (x - margin.left) / (chartWidth - margin.left - margin.right)
        return Math.floor(amt * (_.last(arrayedData.years) - arrayedData.years[0])) + arrayedData.years[0]
      }
      const onMouseMove = (event) => {
        const year = xToYear(d3.mouse(svg.node())[0])
        const rect = d3.select(svg.node().querySelector('.highlighted-year'))
        _.forOwn(yearRectDimensions(year), (value, key) => {
          rect.attr(key, value)
        })
      }
      const onClick = (event) => {
        const year = xToYear(d3.mouse(svg.node())[0])
        state.set('selectedYear', stateId, year)
        updateSelectedYear(year)
      }
      
      updateSelectedYear(state.selectedYear)
      
      return {
        width: chartWidth,
        height: chartHeight,
        margin,
        maxY,
        x,
        y,
        line,
        yAxis,
        xAxis,
        colorFn,
        appendPath,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onClick
      }
    }
    
  }
  )
      },
      {
        name: "state",
        inputs: ["d3","arrayedData","topLevelHierarchies","_"],
        value: (function(d3,arrayedData,topLevelHierarchies,_)
  {
    //
    // This is surely an anti-pattern in observablehq world, but it solved
    // several problems caused by undesireable cell re-evaluation (even with mutables).
    //
    const stateProps = [
      'selectedYear', 
      'selectedYearIndex',
      'selectedCategoryId',
      'selectedCategory',
      'selectedTreeRoot',
      'topLevelIndex',
      'useScaleBudget',
      'scaleBudget',
      'treemapTiler'
    ]
    
    let dispatch = d3.dispatch(...stateProps)
    
    // defaults
    let topLevelIndex = -1
    let selectedYear = 2017
    let selectedYearIndex = arrayedData.years.indexOf(selectedYear)
    let selectedTreeRoot = topLevelHierarchies[-1]
      .sum(n => n.outlays ? n.outlays[selectedYearIndex] : 0)
      .sort((a, b) => b.value - a.value)
    let selectedCategory = _.find(
      selectedTreeRoot.leaves(), 
      l => l.data.id.indexOf('Food and nutrition') !== -1
    )
    let selectedCategoryId = selectedCategory.data.id
    let useScaleBudget = true
    let scaleBudget = 5919
    let treemapTiler = d3.treemapSquarify
        
    let result = {
      selectedYear,
      selectedYearIndex,
      selectedCategoryId,
      selectedCategory,
      selectedTreeRoot,
      topLevelIndex,
      useScaleBudget,
      scaleBudget,
      treemapTiler,
      
      set: (key, id, value) => {
        // store caller's callback
        let fn = dispatch.on(`${key}.${id}`)
        let prevValue = result[key]
        // remove caller's callback
        dispatch.on(`${key}.${id}`, null)
        // set the store value
        result[key] = value
        // notify listeners (except the caller)
        dispatch.call(`${key}`, null, value, prevValue)
        // replace caller's callback
        dispatch.on(`${key}.${id}`, fn)
      },
      on: (key, id, fn) => {
        return dispatch.on(`${key}.${id}`, fn)
      }
    }
    
    // internal computed props.
    //
    // order of prop binding may be an issue. eg, if you bind to
    // selectedCategoryId, it is not guaranteed that 
    // state.selectedCategory will have been updated before your 
    // callback is invoked.
    //
    result.on('selectedYear', 'computed_selectedYear', newValue => {
      const index = arrayedData.years.indexOf(newValue)
      if (result.treemapTiler !== d3.treemapResquarify) {
           result.set('treemapTiler', 'computed_selectedYear', d3.treemapResquarify)
      }
      result.set('selectedYearIndex', 'computed_selectedYear', index)
    })
    
    result.on('topLevelIndex', 'computed_topLevelIndex', newValue => {
      if (result.treemapTiler !== d3.treemapSquarify) {
        result.set('treemapTiler', 'computed_selectedYear', d3.treemapSquarify)
      }
      result.set('selectedTreeRoot', 
       'computed_selectedYear',
        topLevelHierarchies[newValue]
          .sum(n => n.outlays ? n.outlays[result.selectedYearIndex] : 0)
          .sort((a, b) => b.value - a.value)
      )
    })
    
    result.on('selectedCategoryId', 'computed_selectedCategoryPair', newValue => {
      let newCategory = _.find(result.selectedTreeRoot.leaves(), l => l.data.id === newValue)
      result.set('selectedCategory', 'computed_selectedCategoryPair', newCategory)
    })
    
    result.on('selectedCategory', 'computed_selectedCategoryPair', newValue => {
      result.set('selectedCategoryId', 'computed_selectedCategoryPair', newValue.data.id)
    })
    
    // trigger everyone after initial eval ...
    // preferable to hook into some observablehq event but this 
    // is going way outside of standard ohq patterns already ...
    setTimeout(() => {
      stateProps.forEach(name => dispatch.call(name, null, result[name]))
    }, 500)
  
    return result
  }
  )
      },
      {
        name: "yearSlider",
        inputs: ["slider","arrayedData","state"],
        value: (function(slider,arrayedData,state){return(
  (stateId) => {
    const yearSlider = slider({
      min: arrayedData.years[0], 
      max: arrayedData.years[arrayedData.years.length - 1], 
      step: 1, 
      value: state.selectedYear,
      title: "Budget Year", 
      description: `The transition quarter is excluded.`
    })
    
    yearSlider.querySelector('input').addEventListener('input', e => {
      state.set('selectedYear', stateId, parseInt(e.target.value))
    })
  
    // seemingly no amount of hackiness will make it redraw itself on value 
    // change consistently. :(
    // state.on('selectedYear', sliderStateId, newValue => {
    //   const input = d3.select(yearSlider.querySelector('input'))
    //   input.attr('value', newValue)
    //   let redrawHack = input.style('opacity')
    //   input.style('opacity', redrawHack === '0.99' ? 1 : 0.99)
    //   d3.select(yearSlider.querySelector('output')).text(newValue)
    //   console.log(' --- on selectedYear', newValue, input.node())
    // })
    return yearSlider
  }
  )})
      },
      {
        name: "tlcPicker",
        inputs: ["radio","state","d3"],
        value: (function(radio,state,d3){return(
  (stateId) => {
    const catPicker = radio({
      options: [
        { label: "All", value: -1 },
        { label: "Mandatory Programs", value: 0 },
        { label: "Discretionary Programs", value: 1 }
      ],
      value: state.topLevelIndex,
      title: "Top-Level Category",
      // description: "The budget is often broken out into these top-level spending categories."
    })
  
    d3.select(catPicker).selectAll('label').style('display', 'block')
    
    catPicker.addEventListener('change', e => {
      state.set('topLevelIndex', stateId, parseInt(e.target.value))
    })
    
    state.on('topLevelIndex', stateId, newValue => {
      d3.select(catPicker).select('input:checked').attr('checked', null)
      d3.select(catPicker).select(`input[value="${newValue}"]`).attr('checked', true)
    })
    return catPicker
  }
  )})
      },
      {
        name: "useScaleBudgetSwitch",
        inputs: ["checkbox","state","d3"],
        value: (function(checkbox,state,d3){return(
  (stateId) => {
    const budgetSwitch = checkbox({
      title: 'Use Scaled Budget',
      description: '',
      options: [
        { value: 'toggle', label: `<span>Normalize to $${state.scaleBudget}</span>` }
      ],
      value: 'toggle'
    })
    
    budgetSwitch.addEventListener('change', e => {
      state.set('useScaleBudget', stateId, e.target.checked)
    })
    
    state.on('useScaleBudget', stateId, newValue => {
      d3.select(budgetSwitch).select('input').attr('checked', newValue ? true : null)
    })
    
    state.on('scaleBudget', stateId, newValue => {
      d3.select(budgetSwitch).select('label span').text(`Normalize to $${state.scaleBudget}`)
    })
    return budgetSwitch
  }
  )})
      },
      {
        name: "categoryColor",
        inputs: ["d3","_","tlCategoryColors"],
        value: (function(d3,_,tlCategoryColors)
  {
    const fader = (modColor) => ((baseColor) => d3.interpolateRgb(baseColor, modColor)(0.5))
    const scales = _.mapValues(tlCategoryColors, catColor =>
      d3.scaleOrdinal(d3.schemePastel1.map(fader(catColor)))
    )
    return (d) => {
      const topLevelCatName = (d.data.parents && d.data.parents.length) ? d.data.parents[0] : "All"
      return scales[topLevelCatName](d.parent ? d.parent.data.id : '')
    }
  }
  )
      },
      {
        name: "categoryList",
        inputs: ["width","relativeChart","d3","DOM","_","state","categoryColor"],
        value: (function(width,relativeChart,d3,DOM,_,state,categoryColor)
  {
    const stateId = 'categoryList'
    const listWidth = width - relativeChart.chartConfig.width
    const listHeight = relativeChart.chartConfig.height
    const svg = d3.select(DOM.svg(listWidth, listHeight))
    
    // unset. seems to offset everyone.
    svg.attr('viewBox', null)
    
    let i = 0,
        barHeight = 20,
        insetAmt = 5,
        barWidth = listWidth,
        duration = 400
    
    let root = _.cloneDeep(state.selectedTreeRoot)
    
    // const color = (d) => d._children ? "#aaa" : d.children ? "#bbb" : "#fff"
    const color = d => {
      const baseColor = categoryColor(d)
      if (d.data.id === state.selectedCategoryId) {
        return d3.interpolateRgb(baseColor, '#000')(0.5)
      }
      const lightenAmt = (d.children || d._children) ? 0.5 : 0.9
      return d3.interpolateRgb(baseColor, '#fff')(lightenAmt)
    }
  
    const rootGroup = svg.append('g')
        .attr('transform', `translate(0, ${barHeight})`)
    
    const handleClick = (d) => {
      if (d.children) {
        d._children = d.children
        d.children = null
      } 
      else if (d._children) {
        d.children = d._children
        d._children = null
      }
      else {
        state.set('selectedCategoryId', stateId + '_setter', d.data.id)
      }
      update(d, n => n.transition().duration(duration))
    }
    
    const update = (source, transitionFn) => {
      // Compute the flattened node list.
      let nodes = root.descendants();
      
      const svgHeight = Math.max(listHeight, (nodes.length * barHeight) + barHeight);
  
      transitionFn(svg).attr('height', svgHeight);
  
      // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
      let index = -1;
      root.eachBefore(function(n) {
        n.x = ++index * barHeight;
        n.y = n.depth * insetAmt;
      });
  
      // Update the nodes…
      let node = rootGroup.selectAll(".node").data(nodes, d => (d.id || (d.id = ++i)))
  
      let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + source.y0 + "," + source.x0 + ")")
        .style('opacity', 0)
        .style('cursor', 'pointer')
        .on("click", handleClick)
  
      // Enter any new nodes at the parent's previous position.
      nodeEnter.append("rect")
        .attr("y", -barHeight / 2)
        .attr('x', d => -d.y)
        .attr("height", barHeight)
        .attr("width", barWidth)
        .style("fill", color)
        
      
      nodeEnter.append("text")
        .attr("dy", 3.5)
        .attr("dx", 5.5)
           .attr('font-family', 'sans-serif')
           .attr('font-size', '.75em')
        .attr('font-weight', d => (d.children || d._children) ? 'bold' : 'normal')
        .text(d => d.data.name)
  
      // Transition nodes to their new position.
      transitionFn(nodeEnter)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")")
        .style("opacity", 1);
  
      transitionFn(node)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")")
        .style("opacity", 1)
      .select("rect")
        .style("fill", color);
  
      // Transition exiting nodes to the parent's new position.
      transitionFn(node.exit())
        .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
        .style("opacity", 0)
        .remove();
  
      rootGroup.selectAll(".node").attr('fill', d => {
        return d.data.id === state.selectedCategoryId ? '#fff' : '#696969'
      })
      
      // Stash the old positions for transition.
      root.each(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
   
    root.x0 = 0
    root.y0 = 0
    update(root, n => n)
    
    state.on('selectedCategoryId', stateId, newValue => {
      update(root, n => n)
    })
  
    state.on('selectedTreeRoot', stateId, newValue => {
      root = _.cloneDeep(state.selectedTreeRoot)
      update(root, n => n, true)
    })
    
    // to update sort order
    state.on('selectedYear', stateId, newValue => {
      root = _.cloneDeep(state.selectedTreeRoot)
      update(root, n => n, true)
    })
    
    return svg
  }
  )
      },
      {
        name: "treemap",
        inputs: ["width","d3","state","arrayedData","styles","DOM","categoryColor","_"],
        value: (function(width,d3,state,arrayedData,styles,DOM,categoryColor,_)
  {
    const stateId = 'treemap'
    const treemapHeight = 500
    const treemapWidth = width
    
    const generate = () => {
      const treemap = d3.treemap()
        .tile(state.treemapTiler)
        .size([treemapWidth, treemapHeight])
        .round(true)
        .paddingInner(1)
  
      window.d3 = d3
  
      const selectedYearIndex = arrayedData.years.indexOf(state.selectedYear)
  
      const format = state.useScaleBudget ? styles('formatter').dollarsSmall : styles('formatter').dollarsBig
  
      treemap(state.selectedTreeRoot
        .sum(n => n.outlays ? n.outlays[state.selectedYearIndex] : 0)
        .sort((a, b) => b.value - a.value)
      )
  
      const svg = d3.select(DOM.svg(treemapWidth, treemapHeight));
      let cell = svg.selectAll("g")
        .data(state.selectedTreeRoot.leaves())
        .enter().append("g")
          .attr("transform", d => {
            if (isNaN(d.x0) || isNaN(d.y0)) {
              return "translate(-10, -10)"
            }
            else {
              return "translate(" + d.x0 + "," + d.y0 + ")"
            }          
          })
  
      cell.append("rect")
          .attr("id", d => d.data.id)
          .attr("width", d => d.x1 - d.x0 )
          .attr("height", d => d.y1 - d.y0)
          .attr('stroke-width', 3)
          .attr("fill", d => { 
            const normalColor = categoryColor(d)
            if (d.data.id === state.selectedCategoryId) {
              // return d3.interpolateRgb(normalColor, '#fff')(0.8)
              return d3.interpolateRgb(normalColor, '#000')(0.5)
            }
            return normalColor
          });
  
      cell.append("clipPath")
          .attr("id", d => "clip-" + d.data.id)
        .append("use")
          .attr("xlink:href", d => "#" + d.data.id);
  
      cell.append("text")
          .attr("clip-path", d => "url('#clip-" + d.data.id + "')")
          .attr('fill', d => d.data.id === state.selectedCategoryId ? '#fff' : '#555')
        .selectAll("tspan")
          .data((d, i) => {
            const nAllowableLetters = (d.x1 - d.x0) / 5
            const value = state.useScaleBudget ? ((d.value / arrayedData.totals[state.selectedYearIndex]) * state.scaleBudget) : d.value * 1000000
            const spacified = d.data.name.split(/\s+/g).concat([format(value)])
            return spacified.reduce((acc, word) => {
              const lastChunk = _.last(acc)
              if (word[0] === '$' || lastChunk.length + word.length > nAllowableLetters) {
                acc.push(word)
              }
              else {
                acc[acc.length - 1] = `${lastChunk} ${word}`
              }
              return acc
            }, [''])
          })
        .enter().append("tspan")
          .attr("x", 4)
          .attr("y", (d, i) => 13 + i * 10)
          .attr('font-size', '9')
          .attr('font-family', 'sans-serif')
          .attr('font-weight', (d, i) => d.indexOf('$') === -1 ? 'bold' : 'normal')
          .text(d => d)
  
      cell.append("title").text(d => d.data.id + "\n" + format(d.value) );
  
      cell.on('mouseover', (d, i, e) => { 
        const rect = e[i].querySelector('rect')
        rect.setAttribute('stroke', d3.interpolateRgb(styles('highlightColor'), '#fff')(0.3))
        rect.setAttribute('stroke-width', 2)
      })
      cell.on('mouseout', (d, i, e) => { 
          const rect = e[i].querySelector('rect')
          rect.setAttribute('stroke', null)
      })
      cell.on('mousedown', (d, i) => { state.set('selectedCategoryId', stateId, d.data.id) })
      svg.classed('treemap')
      
      return svg
    }
    
    const container = d3.select(DOM.element('div'))
    container.classed('treemap-container')
    const dependencies = [
      'selectedYearIndex', 
      'topLevelIndex', 
      'selectedTreeRoot', 
      'useScaleBudget',
      'scaleBudget',
      'selectedCategory'
    ]
    dependencies.forEach(name => {
      state.on(name, stateId, newValue => {
        container.select('svg').remove()
        container.node().appendChild(generate().node())
      })
    })
    
    container.node().appendChild(generate().node())
    return container
  }
  )
      },
      {
        name: "topLevelHierarchies",
        inputs: ["treeData","d3","_"],
        value: (function(treeData,d3,_)
  {
    const generateIds = (prepend) => {
      return d => {
        let result = (!d.parent && prepend) ? prepend + ' / ' : ''
        result += (d.parent ? d.parent.data.id + " / " : "")
        result += d.data.name
        d.data.id = result
      }
    }
    
    let children = treeData.children.map((childNode, i) => {
      return d3.hierarchy(_.cloneDeep(treeData.children[i])).eachBefore(generateIds('Outlays'))
    })
    
    return {
      [-1]: d3.hierarchy(_.cloneDeep(treeData)).eachBefore(generateIds()),
      0: children[0],
      1: children[1]
    }
  }
  )
      },
      {
        name: "styles",
        inputs: ["d3"],
        value: (function(d3){return(
  (name, extra) => {
    const highlightColorLow = d3.interpolateRgb('#4499bb', '#875')(0.2)
    const highlightColor = d3.interpolateRgb('orange', '#875')(0.2)
    const defaults = {
      highlightColor,
      highlightColorLow,
        highlightText: `font-family: sans-serif; color: ${highlightColor}; font-weight: bold;`,
      highlightTextLow: `font-family: sans-serif; color: ${highlightColorLow}; font-weight: bold;`,
      formatter: {
        dollarsBig: d3.format('$,'),
        dollarsSmall: d3.format('$,.2f'),
        percentage: d3.format('.1%')
      }
    }
    return extra ? defaults[name] + (extra || '') : defaults[name]
  }
  )})
      },
      {
        name: "tlCategoryColors",
        value: (function()
  {
    return { 
      "Mandatory Programs": '#aaf',
      "Discretionary Programs": '#afa',
      "All": '#fff'
    }
  }
  )
      },
      {
        name: "estimateStartYear",
        value: (function(){return(
  2018
  )})
      },
      {
        name: "estimateStartYearIndex",
        inputs: ["arrayedData","estimateStartYear"],
        value: (function(arrayedData,estimateStartYear){return(
  arrayedData.years.indexOf(estimateStartYear)
  )})
      },
      {
        name: "treeData",
        inputs: ["_","arrayedData"],
        value: (function(_,arrayedData)
  {
    let root = {
      name: "Outlays",
      children: []
    }
    
    const insertItem = (item) => {
      let branch = root
  
      // ensure hierarchy exists
      for (let p of item.parents) {
        let index = _.findIndex(branch.children, i => i.name === p)
        if (index === -1) {
          branch.children.push({ name: p, children: [] })
          index = branch.children.length - 1
        }
        branch = branch.children[index]
      }
  
      branch = root
  
      // insert item as leaf
      if (item.parents.length > 0) {
        let index = _.findIndex(branch.children, i => i.name === item.parents[0])
        branch = root.children[index]
        for (let i = 1; i < item.parents.length; i++) {
          index = _.findIndex(branch.children, t => t.name === item.parents[i])
          branch = branch.children[index]
        }
      }
  
      // branch.children.push({ ...item, children: [] })
      branch.children.push(Object.assign({}, item, { children: [] }))
  
    }
  
    arrayedData.items.forEach(i => { insertItem(i) })
    
    return root
  }
  )
      },
      {
        name: "arrayedData",
        inputs: ["rawData","_","structure","d3"],
        value: (function(rawData,_,structure,d3)
  {
      let result = { 
          years: [],
          items: [],
          totals: []
      }
      
      let flatData = [...rawData.mandatory, ...rawData.discretionary]
      
      // filter out transition quarter (for now)?
      const tqYearIndex = 15
      
      // array of years
      result.years = [...rawData.mandatory[2]].splice(1)
          .map(y => (isNaN(parseInt(y)) ? null : parseInt(y)))
            .filter(y => !!y)
      
        const convertOutlayLine = outlayLine => {
        const values = _.slice([...outlayLine], 1)
        return [...(_.slice(values, 0, tqYearIndex)), ...(_.slice(values, tqYearIndex + 1))]
          .map(outlay => outlay.replace(/[",]/g, ''))
          .map(n => parseInt(n))
          .map(n => isNaN(n) ? 0 : n)
      }
    
      // capture totals from byFunction table
      const totalOutlaysIndex = 145
      result.totals = convertOutlayLine(rawData.byFunction[totalOutlaysIndex])
      
      // using structure, fill in outlays numbers based on data
      // by matching outlay category names. preserve structure hierarchy
      // in a "lineage" property for each item.
        const generateItems = (structureObj, parents) => {
        let result = []
        if (structureObj.items) {
          // has sub-categories
          const lineage = parents.concat(structureObj.name)
          result = structureObj.items.reduce((acc, item) => { 
            return acc.concat(generateItems(item, lineage))
          }, result)
        }
        else if (structureObj.outlays) {
          // line-item, has costs
          let outlays = []
          for (let line of flatData) {
            if (line[0].toLowerCase() === structureObj.name.toLowerCase()) {
              outlays = convertOutlayLine(line)
            }
          }
          result = Object.assign({}, structureObj, { outlays, parents })
          // result = {
          //   ...structureObj,
          //   outlays,
          //   parents
          // }
        }
        return result
      }
    
      const mandatoryItems = generateItems(structure[0], [])
      const discretionaryItems = generateItems(structure[1], [])
      
      result.items = [...mandatoryItems, ...discretionaryItems]
            .filter(item => _.every(item.outlays, outlay => outlay >= 0))
            .sort((a, b) => d3.max(b.outlays) - d3.max(a.outlays))
        
    
      return result
  }
  )
      },
      {
        name: "structure",
        value: (function(){return(
  [
      {
          "name": "Mandatory Programs",
          "items": [
              {
                  "name": "Human resource programs",
                  "items": [
                      { 
                          "name": "Education, training, employment, and social services",
                          "outlays": []
                      },
                      {
                          "name": "Health",
                          "items": [
                              {
                                  "name": "Medicaid",
                                  "outlays": []
                              },
                              {
                                  "name": "Refundable Premium Tax Credit and Cost Sharing Reductions",
                                  "outlays": []
                              },
                              {
                                  "name": "Childrens Health Insurance",
                                  "outlays": []
                              },
                              {
                                  "name": "Other - Health",
                                  "outlays": []
                              }
                          ]
                      },
                      {
                          "name": "Medicare",
                          "outlays": []
                      },
                      {
                          "name": "Income Security",
                          "items": [
                              {
                                  "name": "General retirement and disability",
                                  "outlays": []
                              },
                              {
                                  "name": "Federal employee retirement and disability",
                                  "outlays": []
                              },
                              {
                                  "name": "Unemployment compensation",
                                  "outlays": []
                              },
                              {
                                  "name": "Food and nutrition assistance",
                                  "outlays": []
                              },
                              {
                                  "name": "Supplemental Security Income",
                                  "outlays": []
                              },
                              {
                                  "name": "Family and Other Support Assistance",
                                  "outlays": []
                              },
                              {
                                  "name": "Earned Income Tax Credit",
                                  "outlays": []
                              },
                              {
                                  "name": "Child Tax Credit",
                                  "outlays": []
                              },
                              {
                                  "name": "Making Work Pay Tax Credit",
                                  "outlays": []
                              },
                              {
                                  "name": "Payments to States for foster care/adoption assistance",
                                  "outlays": []
                              },
                              {
                                  "name": "Housing Assistance and Other (including offsetting receipts)",
                                  "outlays": []
                              }
                          ]
                      },
                      {
                          "name": "Social Security",
                          "outlays": []
                      },
                      {
                          "name": "Veterans benefits and services",
                          "items": [
                              {
                                  "name": "Income security for veterans",
                                  "outlays": []
                              },
                              {
                                  "name": "Other - Veterans benefits and services",
                                  "outlays": []
                              }
                          ]
                      }
                  ]
              },
              {
                  "name": "Other mandatory programs",
                  "items": [
                      {
                          "name": "National defense",
                          "outlays": []
                      },
                      {
                          "name": "International affairs",
                          "outlays": []
                      },
                      {
                          "name": "Energy",
                          "outlays": []
                      },
                      {
                          "name": "Agriculture",
                          "outlays": []
                      },
                      {
                          "name": "Deposit insurance",
                          "outlays": []
                      },
                      {
                          "name": "Universal service fund",
                          "outlays": []
                      },
                      {
                          "name": "Other commerce and housing credit",
                          "outlays": []
                      },
                      {
                          "name": "Community and regional development",
                          "outlays": []
                      },
                      {
                          "name": "General government",
                          "outlays": []
                      },
                      {
                          "name": "Allowances",
                          "outlays": []
                      },
                      {
                          "name": "Spectrum auctions and major asset sales",
                          "outlays": []
                      },
                      {
                          "name": "Other undistributed offsetting receipts",
                          "outlays": []
                      },
                      {
                          "name": "All other",
                          "outlays": []
                      }
                  ]
              },
                {
                "name": "Interest",
                "items": [
                    {
                        "name": "Interest on Treasury debt securities (gross)",
                        "outlays": []
                    },
                    {
                        "name": "Interest Received",
                        "items": [
                            {
                                "name": "On-budget trust funds",
                                "outlays": []
                            },
                            {
                                "name": "Off-budget trust funds",
                                "outlays": []
                            }
                        ]
                    },
                    {
                        "name": "Other - Interest",
                        "outlays": []
                    }
                ]
            },
          ]
      },
      {
          "name": "Discretionary Programs",
          "items": [
              { 
                  "name": "National defense",
                  "items": [
                      {
                          "name": "DoD-Military (051)",
                          "outlays": []
                      },
                      {
                          "name": "Other Defense",
                          "outlays": []
                      }
                  ]
              },
              {
                  "name": "Nondefense",
                  "items": [
                      {
                          "name": "International affairs",
                          "outlays": []
                      },
                      {
                          "name": "General science, space and technology",
                          "items": [
                              {
                                  "name": "General science and basic research",
                                  "outlays": []
                              },
                              {
                                  "name": "Space and other technology",
                                  "outlays": []
                              }
                          ]
                      },
                      {
                          "name": "Energy",
                          "outlays": []
                      },
                      {
                          "name": "Natural resources and environment",
                          "outlays": []
                      },
                      {
                          "name": "Agriculture",
                          "outlays": []
                      },
                      {
                          "name": "Commerce and housing credit",
                          "outlays": []
                      },
                      {
                          "name": "Transportation",
                          "items": [
                              {
                                  "name": "Ground transportation",
                                  "outlays": []
                              },
                              {
                                  "name": "Air transportation",
                                  "outlays": []
                              },
                              {
                                  "name": "Water and other transportation",
                                  "outlays": []
                              }
                          ]
                      },
                      {
                          "name": "Community and regional development",
                          "outlays": []
                      },
                      {
                          "name": "Education, training, employment and social services",
                          "items": [
                              {
                                  "name": "Education",
                                  "outlays": []
                              },
                              {
                                  "name": "Training, employment and social services",
                                  "outlays": []
                              }
                          ]
                      },
                      {
                          "name": "Health",
                          "outlays": []
                      },
                      {
                          "name": "Medicare - Discretionary",
                          "outlays": []
                      },
                      {
                          "name": "Income security",
                          "items": [
                              {
                                  "name": "Housing assistance",
                                  "outlays": []
                              },
                              {
                                  "name": "Other - Income security",
                                  "outlays": []
                              }
                          ]
                      },
                      {
                          "name": "Social Security - Discretionary",
                          "outlays": []
                      },
                      {
                          "name": "Veterans benefits and services",
                          "outlays": []
                      },
                      {
                          "name": "Administration of justice",
                          "outlays": []
                      },
                      {
                          "name": "General government",
                          "outlays": []
                      },
                      {
                          "name": "Allowances",
                          "outlays": []
                      }
                  ]
              }
          ]
      }
  ]
  )})
      },
      {
        name: "rawData",
        inputs: ["d3"],
        value: (function(d3)
  {
    const mandatory = fetch('https://gist.githubusercontent.com/patternleaf/8e2a636afb82da6d41c1b70f104c1be7/raw/e4036db8ddb00e319c73558be252dd8062e9356c/mandatory-outlays.csv').then(r => r.text()).then(t => d3.csvParseRows(t))
    
    const discretionary = fetch('https://gist.githubusercontent.com/patternleaf/8e2a636afb82da6d41c1b70f104c1be7/raw/e4036db8ddb00e319c73558be252dd8062e9356c/discretionary-outlays.csv').then(r => r.text()).then(t => d3.csvParseRows(t))
    const byFunction = fetch('https://gist.githubusercontent.com/patternleaf/8e2a636afb82da6d41c1b70f104c1be7/raw/629ef3d3322af51f8e546ac46aed83e5b166ea78/outlays-by-function-and-subfunction.csv').then(r => r.text()).then(t => d3.csvParseRows(t))
  
    return Promise.all([mandatory, discretionary, byFunction])
      .then(([mandatory, discretionary, byFunction]) => { 
          // console.log(discretionary)
          return { mandatory, discretionary, byFunction } 
        })
  }
  )
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require('d3')
  )})
      },
      {
        from: "@jashkenas/inputs",
        name: "number",
        remote: "number"
      },
      {
        from: "@jashkenas/inputs",
        name: "radio",
        remote: "radio"
      },
      {
        from: "@jashkenas/inputs",
        name: "slider",
        remote: "slider"
      },
      {
        from: "@jashkenas/inputs",
        name: "input",
        remote: "input"
      },
      {
        from: "@jashkenas/inputs",
        name: "checkbox",
        remote: "checkbox"
      },
      {
        name: "_",
        inputs: ["require"],
        value: (function(require){return(
  require('lodash')
  )})
      }
    ]
  };
  
  const m1 = {
    id: "@jashkenas/inputs",
    variables: [
      {
        name: "number",
        inputs: ["input"],
        value: (function(input){return(
  function number(config = {}) {
    const {value, title, description, placeholder, submit, step, min, max} = config;
    if (typeof config == "number") value = config;
    const form = input({
      type: "number", title, description, submit,
      attributes: {value, placeholder, step, min, max},
      getValue: (input) => input.valueAsNumber
    });
    form.output.remove();
    form.input.style.width = "auto";
    form.input.style.fontSize = "1em";
    return form;
  }
  )})
      },
      {
        name: "radio",
        inputs: ["input","html"],
        value: (function(input,html){return(
  function radio(config = {}) {
    let {value: formValue, title, description, submit, options} = config;
    if (Array.isArray(config)) options = config;
    options = options.map(o => typeof o === "string" ? {value: o, label: o} : o);
    const form = input({
      type: "radio", title, description, submit, 
      getValue: input => {
        const checked = Array.prototype.find.call(input, radio => radio.checked);
        return checked ? checked.value : undefined;
      }, 
      form: html`
        <form>
          ${options.map(({value, label}) => `
            <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
             <input type=radio name=input value="${value}" ${value === formValue ? 'checked' : ''} style="vertical-align: baseline;" />
             ${label}
            </label>
          `)}
        </form>
      `
    });
    form.output.remove();
    return form;
  }
  )})
      },
      {
        name: "slider",
        inputs: ["input"],
        value: (function(input){return(
  function slider(config = {}) {
    let {value, min = 0, max = 1, step = "any", precision = 2, title, description, format, submit} = config;
    if (typeof config == "number") value = config;
    if (value == null) value = (max + min) / 2;
    precision = Math.pow(10, precision);
    return input({
      type: "range", title, description, submit, format,
      attributes: {min, max, step, value},
      getValue: input => Math.round(input.valueAsNumber * precision) / precision
    });
  }
  )})
      },
      {
        name: "input",
        inputs: ["html","d3format"],
        value: (function(html,d3format){return(
  function input(config) {
    let {form, type = "text", attributes = {}, action, getValue, title, description, format, submit, options} = config;
    if (!form) form = html`<form>
      <input name=input type=${type} />
    </form>`;
    const input = form.input;
    Object.keys(attributes).forEach(key => {
      const val = attributes[key];
      if (val != null) input.setAttribute(key, val);
    });
    if (submit) form.append(html`<input name=submit type=submit style="margin: 0 0.75em" value="${typeof submit == 'string' ? submit : 'Submit'}" />`);
    form.append(html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`);
    if (title) form.prepend(html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`);
    if (description) form.append(html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`);
    if (format) format = d3format.format(format);
    if (action) {
      action(form);
    } else {
      const verb = submit ? "onsubmit" : type == "button" ? "onclick" : type == "checkbox" || type == "radio" ? "onchange" : "oninput";
      form[verb] = (e) => {
        e && e.preventDefault();
        const value = getValue ? getValue(input) : input.value;
        if (form.output) form.output.value = format ? format(value) : value;
        form.value = value;
        if (verb !== "oninput") form.dispatchEvent(new CustomEvent("input"));
      };
      if (verb !== "oninput") input.oninput = e => e && e.stopPropagation() && e.preventDefault();
      if (verb !== "onsubmit") form.onsubmit = (e) => e && e.preventDefault();
      form[verb]();
    }
    return form;
  }
  )})
      },
      {
        name: "checkbox",
        inputs: ["input","html"],
        value: (function(input,html){return(
  function checkbox(config = {}) {
    let {value: formValue, title, description, submit, options} = config;
    if (Array.isArray(config)) options = config;
    options = options.map(o => typeof o === "string" ? {value: o, label: o} : o);
    const form = input({
      type: "checkbox", title, description, submit, 
      getValue: input => {
        if (input.length) return Array.prototype.filter.call(input, i => i.checked).map(i => i.value);
        return input.checked ? input.value : undefined;
      }, 
      form: html`
        <form>
          ${options.map(({value, label}) => `
            <label style="display: inline-block; margin: 5px 10px 3px 0; font-size: 0.85em;">
             <input type=checkbox name=input value="${value || "on"}" ${(formValue || []).indexOf(value) > -1 ? 'checked' : ''} style="vertical-align: baseline;" />
             ${label}
            </label>
          `)}
        </form>
      `
    });
    form.output.remove();
    return form;
  }
  )})
      },
      {
        name: "d3format",
        inputs: ["require"],
        value: (function(require){return(
  require("d3-format")
  )})
      }
    ]
  };
  
  const notebook = {
    id: "fd5ed121d2178bac@2533",
    modules: [m0,m1]
  };
  
  export default notebook;