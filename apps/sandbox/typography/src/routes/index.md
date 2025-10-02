<hgroup>

# Sandbox Typography

All available tokens from `@theme` and `@utility`

</hgroup>

This is a theme sandbox to play with the Tailwind custom theme I'm using. All
styling elements should be from it. Hopefully, it's going to come together
neatly.

## Layout

A few utilities exist for setting the width of elements in a `lane`. The
default `.lane > *` style is shown first. Other adjustments go on the affected
children.

<small class="block mb-8">Note that the desktop border does sit below the lane's contents,
but these demonstration containers are semi-transparent.</small>

<div class="contents">
  <div class="lane-inner bg-amber-200/20 p-2">lane-inner (automatic)</div>
  <div class="lane-full bg-teal-200/20 p-2">lane-full</div>
  <div class="lane-bleed bg-green-200/20 p-2">lane-bleed</div>
</div>

## Normal Text

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Adjacent paragraphs have their spacing compressed compared to most flow elements. This makes it easier to see these as related, and should read a little more tightly.

You see it now, what do you think?

## Headings

Headings follow a predictable pattern, varying their sizing and spacing to
communicate their level.

Note that `h1` and `h2` reserve a bit of extra space above.

<div class="grid gap-8 bg-surface lane-full px-gutter py-4">

# H1 - It's big and a little narrow!

## H2 - Smaller and heavier than titles.

### H3 - _Even_ smaller and heavier.

#### H4 - You will literally never guess.

##### H5 - This is the same size as body text.

###### H6 - This is a touch even smaller.

</div>

### Heading Group

There's also an option to use an `hgroup`, which always gets top margin and
can communicate a de-emphasized subtitle.

<div class="grid gap-8 bg-surface lane-full px-gutter py-4">

  <hgroup>
    <h1>53 More Things to Do in Zero Gravity</h1>
    <p>41 is a real galaxy-bender</p>
  </hgroup>

  <hgroup>
    <h2>What is a <code>div</code>, anyway?</h2>
    <p>It's good for more than just soup!</p>
  </hgroup>

 <hgroup>
    <h3>Lando Norris will turn this season around!</h3>
    <p>And other hilarious jokes you can tell yourself...</p>
  </hgroup>

</div>

## Inline text elements

<div class="grid grid-cols-2 px-4">
  <div class="grid gap-2 justify-start">
    <abbr title="Abbreviation">Abbr.</abbr>
    <strong>Bold</strong>
    <em>Italic</em>
    <del>Deleted</del>
    <ins>Inserted</ins>
    <span><kbd>ctrl</kbd> + <kbd>s</kbd></span>
    <p><code>code</code></p>
  </div>
  <div class="grid gap-2 justify-start">
    <a href="#">Anchor</a>
    <p><mark>Highlighted</mark></p>
    <s>Strikethrough</s>
    <small>Small </small>
    <p>Text <sub>Sub</sub></p>
    <p>Text <sup>Sup</sup></p>
    <u>Underline</u>
  </div>
</div>

### Demo with inline elements

I used to _write_ with him, ~imbibe~ **abide** with him, and <u>ride</u> with him; <br/>
I find myself on this side of a sizable divide with him.<br/>
Now set your sights on a scenario where every Hamiltonian plan is implemented.<br/>
That's where we're headed... <mark>He's doubled the size of the government,<br/>
wasn't the trouble with much of our previous government size?</mark><br/>
<small>(and taxes?)</small> Yet he acts as if he has exculsive access to the facts,<br/>
but the fact is we can't relax.<br/>
He likes his taxes so much; can we enact an \*\*\*\*\*\*\* tax?<br/>

[source](https://genius.com/Lin-manuel-miranda-washington-on-your-side-2014-workshop-lyrics)

<del><small>(And taxes?)</small> Yet he acts ... enact an \*\*\*\*\*\*\* tax?</del><br/>
<ins>Look in his eyes! See how he lies?</ins><br/>
<ins>Follow the scent of his enterprise...</ins>

[source 2](https://genius.com/Daveed-diggs-leslie-odom-jr-okieriete-onaodowan-and-original-broadway-cast-of-hamilton-washington-on-your-side-lyrics)

Additional text is here to show the other stuff,
<abbr title="HyperText Markup Language">HTML</abbr> is pretty capable and can
do more than I can shove into a snippet from _Hamilton_<sup>1</sup>.

In particular, there aren't any abbreviations to dig into with `abbr`, nor any
inline code snippets or even `kbd` shortcuts like <kbd>⌘ F</kbd> ... What were
they thinking when they wrote this thing?

<sup>1</sup>Miranda, Lin-Manuel. _Hamilton: An American Musical._

Or, try `bun add -d hamilton`

## Block elements

### Lists

Hopefully none of this is surprising.

#### Unordered Lists

Some items:

- cheese
- lettuce
- tomato
- onion
- mayo

Other notes:

- Of all the drama, of all the controversy, of all the magic moments in Formula one in 2021. It comes down to this and in this moment, it looks like it's gonna go the way of Max Verstappen.
- Mercedes, not happy! Red Bull will be delighted!
- They have shared a brilliant championship battle. But the championship can only be won by one and it's going Dutch for 2021. **Max Verstappen for the first time ever is champion of the world!**

#### Ordered Lists

1. cheese
1. lettuce
1. tomato
1. onion
1. mayo
1. Bread is a baked food product made from water, flour, and often yeast. It is a staple food across the world, particularly in Europe and the Middle East. Throughout recorded history and around the world, it has been an important part of many cultures' diets. It is one of the oldest human-made foods, having been of significance since the dawn of agriculture, and plays an essential role in both religious rituals and secular culture.

### Preformatted Text / Code Blocks

Preformatted text will use a CRT-inspired-ish glow similar to inline `code`.
It's expected that syntax highlighting will happen on this canvas.

```
async function main(args: string[]) {
  console.log("hello world");
  for (const a of args) {
    await fetch(`/api/${a}`);
  }
  return 0;
}
```

### Quotes

Everyday blockquotes are pretty minimal, with a bit of padding and a left-side
border to offset the text without any major attention-seeking.

> Don't communicate by sharing memory, share memory _by communicating_.

Longer blockquotes are pretty similar.

> [Go](<https://en.wikipedia.org/wiki/Go_(programming_language)>) is a [high-level](https://en.wikipedia.org/wiki/High-level_programming_language) [general purpose programming language](https://en.wikipedia.org/wiki/General_purpose_programming_language) that is [statically typed](https://en.wikipedia.org/wiki/Static_typing) and [compiled](https://en.wikipedia.org/wiki/Compiled_language). It is known for the simplicity of its syntax and the efficiency of development that it enables by the inclusion of a large standard library supplying many needs for common projects. It was designed at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson, and publicly announced in November of 2009.
>
> It is syntactically similar to C, but also has garbage collection, structural typing, and CSP-style concurrency. It is often referred to as Golang to avoid ambiguity and because of its former domain name, golang.org, but its proper name is Go.
>
> There are two major implementations.

It's also possible to add a de-emphasized footer.

> Don't communicate by sharing memory, share memory _by communicating_.
>
> <footer><cite>Rob Pike, <em>Gopherfest 2015 | Go Proverbs</em></cite></footer>

### Alerts

There are GitHub-flavored alerts as well. In contrast to `blockquote`, these
are visually elevated and do seek attention.

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.
>
> For example, using `bun run --hot file.ts` will watch the file and its
> dependencies for changes, performing a hot reload if anything is updated.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
