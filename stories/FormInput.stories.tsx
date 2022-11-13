import type { ComponentMeta, ComponentStory } from "@storybook/react"

import { FormInput } from "~/components/FormInput"

export default {
  title: "FranciscoExamples/FormInput",
  component: FormInput
} as ComponentMeta<typeof FormInput>

const Template: ComponentStory<typeof FormInput> = (args) => <FormInput {...args} />

export const PrimaryInput = Template.bind({})
PrimaryInput.args = { variant: "primary" }

export const ErrorInput = Template.bind({})
ErrorInput.args = { variant: "error" }

export const Disabled = Template.bind({})
Disabled.args = {
  variant: "primary",
  disabled: true
}
